"use client"

import { useEffect } from "react"
import DashboardLayout from "@/layouts/DashboardLayout"
import Pagination from "@/ui/components/common/Table/Pagination"
import TableLayout from "@/ui/components/common/Table/TableLayout"
import { debounce } from "lodash"
import ModalComponent from "@/ui/components/common/ModalComponent"
import SearchInput from "@/ui/components/common/SearchInput"
import TitleOfPage from "@/ui/components/common/pages/TitleOfPage"
import { useStarshipsHook } from "@/hooks/starships/useStarshipHook"
import { formatDateIsoTime } from "@/functions/DateHelpers"
import StarshipModal from "@/ui/components/features/Modal/Starships/StarshipsModal"

export default function Home() {
  const {
    starships,
    currentPage,
    error,
    isLoading,
    totalPages, 
    fetchStarships,
    setSelectedStarship,
    selectedStarship,
    isModalOpen,
    setCurrentPage,
    toggleModal,
} = useStarshipsHook();

  const columns = [
    {
      key: 'name',
      label: 'name',
      sortable: false,
    },
    {
      key: 'passengers',
      label: 'Passengers',
    },
    {
      key: 'cost_in_credits',
      label: 'Cost in credits',
    },
    {
      key: 'starship_class',
      label: 'Starship class',
    },
    {
      key: 'length',
      label: 'Length',
    },
    {
      key: 'manufacturer',
      label: 'Manufacturer',
    },
    // {
    //   key: 'crew',
    //   label: 'Crew',
    // },
    {
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
          className="px-4 py-2 truncate rounded-lg bg-[var(--lightsaber-blue)] text-[var(--star-white)] hover:bg-[var(--rebel-yellow)] transition-colors"
        >
          View Details
        </button>
      ),
    },
  ];

  function handleView(character: any) {
    setSelectedStarship(character);
    toggleModal(true);
  }

  // Debounced search handler
  const debouncedSearch = debounce((value: string) => {
    setCurrentPage(1);
    fetchStarships(1, value);
  }, 500);

  useEffect(() => {
    fetchStarships();
  }, [currentPage]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
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
        <TitleOfPage title="Star Wars Starships">
          <SearchInput
            onChange={debouncedSearch}
            placeholder="Search for Starships..."
          />
        </TitleOfPage>

        <TableLayout
          columns={columns}
          data={starships}
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
          name={selectedStarship?.name || ""}
        >
          <StarshipModal
            starship={selectedStarship}
          />
        </ModalComponent>
      </div>
    </DashboardLayout>
  );
}