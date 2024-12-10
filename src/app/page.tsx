"use client"

import { getPeopleList } from "@/api/services/people.service"
import DashboardLayout from "@/layouts/DashboardLayout"
import ModalComponent from "@/ui/components/common/ModalComponent"
import SearchInput from "@/ui/components/common/SearchInput"
import Pagination from "@/ui/components/common/Table/Pagination"
import TableLayout from "@/ui/components/common/Table/TableLayout"
import { debounce } from "lodash"
import { useEffect, useState } from "react"

export default function Home() {
  const [people, setPeople] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [searchKey, setSearchKey] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSeeingDetails, setIsSeeingDetails] = useState<boolean>(false)
  const [peopleDetails, setPeopleDetails] = useState<any>()

  const columns = [
    {
      key: 'name',
      label: 'Name',
      sortable: false,
    },
    {
      key: 'gender',
      label: 'Gender',
    },
    {
      key: 'birth_year',
      label: 'Birth year',
    },
    {
      key: 'skin_color',
      label: 'Skin Color',
    },
    {
      key: 'eye_color',
      label: 'Eye Color',
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (row: any) => (
        <button
          onClick={() => handleView(row)}
          className="px-4 py-2 rounded-lg bg-[var(--lightsaber-blue)] text-[var(--star-white)] hover:bg-[var(--rebel-yellow)] transition-colors"
        >
          View Details
        </button>
      ),
    },
  ];


  function handleView(people: any){
    console.log("🚀 ~ handleView ~ people:", people)
    setIsSeeingDetails(true)
    setPeopleDetails(people)
  }
  async function getPeopleRequest(search?: string) {
    console.log("🚀 ~ getPeopleRequest ~ search:", search)
    setIsLoading(true)
    try {
      const response = await getPeopleList(search || '', currentPage)
      if (response.results.length) {
        setTotalPages(Math.ceil(response.count / 10))
        setPeople(response.results)
      } else {
        setPeople([])
        setTotalPages(1)
      }
    } catch (error) {
      console.error('Error fetching people:', error)
      setPeople([])
      setTotalPages(1)
    } finally {
      setIsLoading(false)
    }
  }


  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  // Debounced search function
  const debouncedSearch = debounce((searchValue: string) => {
    if (searchValue === '') {
      // If search is cleared, reset to initial state and fetch all data
      setCurrentPage(1)
      getPeopleRequest('')
    } else {
      setCurrentPage(1)
      getPeopleRequest(searchValue)
    }
  }, 500)
  // Handle search input change
  const handleSearchChange = (value: string) => {
    console.log("🚀 ~ handleSearchChange ~ value:", value)
    if(value === ''){
      console.log("empty search query");
      setSearchKey('')
      getPeopleRequest('')
      setCurrentPage(1)
      return
    }
    console.log("not empty search query");

    setSearchKey(value)
    debouncedSearch(value)
  }
  useEffect(() => {
    // Only fetch if not searching
    if (!searchKey) {
      getPeopleRequest()
    }
  }, [currentPage])

  useEffect(() => {
    // Cleanup debounce on component unmount
    return () => {
      debouncedSearch.cancel()
    }
  }, [])

  return (
    <DashboardLayout name="home">
      <div className="flex flex-col gap-[16px]">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[var(--lightsaber-blue)]">Star Wars Characters</h1>
          <div className="w-72">
            <SearchInput
              value={searchKey}
              onChange={handleSearchChange}
              placeholder="Search characters..."
            />
          </div>
        </div>
        <TableLayout
          columns={columns}
          data={people}
          isLoading={isLoading}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <ModalComponent
        character={peopleDetails}
        isOpen={isSeeingDetails}
        onClose={()=> setIsSeeingDetails(false)}
      />
    </DashboardLayout>
  )
}
