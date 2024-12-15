"use client"

import { useEffect } from "react"
import DashboardLayout from "@/layouts/DashboardLayout"
import Pagination from "@/ui/components/common/Table/Pagination"
import TableLayout from "@/ui/components/common/Table/TableLayout"
import { debounce } from "lodash"
import ModalComponent from "@/ui/components/common/ModalComponent"
import SearchInput from "@/ui/components/common/SearchInput"
import { usePeopleHook } from "@/hooks/people/usePeopleHook"
import TitleOfPage from "@/ui/components/common/pages/TitleOfPage"
import CharacterModal from "@/ui/components/features/Modal/people/PeopleModal"
import { formatDateIsoTime } from "@/functions/DateHelpers"

export default function Home() {
  const {
    characters,
    currentPage,
    totalPages,
    // searchQuery,
    isLoading,
    error,
    isModalOpen,
    selectedCharacter,
    fetchCharacters,
    setSearchQuery,
    setCurrentPage,
    setSelectedCharacter,
    toggleModal,
  } = usePeopleHook();
    console.log("🚀 ~ Home ~ totalPages:", totalPages)

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
    },{
      key: 'created',
      label: 'Created',
      render: (row: Planet) => formatDateIsoTime(row.created).fullFormat
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (row: any) => (
        <button
          onClick={() => handleView(row)}
          className="px-4 py-2 rounded-lg bg-[var(--rebel-yellow)] text-[var(--star-white)] hover:bg-[var(--rebel-yellow)] transition-colors"
        >
          View Details
        </button>
      ),
    },
  ];

  function handleView(character: any) {
    setSelectedCharacter(character);
    toggleModal(true);
  }

  // Debounced search handler
  const debouncedSearch = debounce((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
    fetchCharacters(1, value);
  }, 500);

  useEffect(() => {
    console.log("🚀 ~Before Home ~ currentPage:", currentPage)
    fetchCharacters();
    console.log("🚀 ~After Home ~ currentPage:", currentPage)
  }, [currentPage]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
      fetchCharacters(1, '')
    };
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg">
            {error}
          </div>
        )}

        <TitleOfPage title="Star Wars Characters">
          <SearchInput
            // value={searchQuery}
            onChange={debouncedSearch}
            placeholder="Search for Characters..."
          />
        </TitleOfPage>
        
        <TableLayout
          columns={columns}
          data={characters}
          isLoading={isLoading}
        />
        
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

        <ModalComponent
          isOpen={isModalOpen}
          onClose={() => toggleModal(false)}
          name={selectedCharacter?.name}
          // character={selectedCharacter}
        >
          <CharacterModal character={selectedCharacter} />
        </ModalComponent>
      </div>
    </DashboardLayout>
  );
}