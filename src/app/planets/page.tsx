"use client"

import { useEffect } from "react"
import DashboardLayout from "@/layouts/DashboardLayout"
import Pagination from "@/ui/components/common/Table/Pagination"
import TableLayout from "@/ui/components/common/Table/TableLayout"
import { debounce } from "lodash"
import SearchInput from "@/ui/components/common/SearchInput"
import TitleOfPage from "@/ui/components/common/pages/TitleOfPage"
import usePlanetHook from "@/hooks/planet/usePlanetHook"
import { formatDateIsoTime } from "@/functions/DateHelpers"

export default function Home() {
  const {
    planets,
    currentPage,
    error,
    isLoading,
    totalPages, 
    fetchPlanets,
    setSelectedPlanet,
    searchQuery,
    clearError,
    setCurrentPage,
    toggleModal,
} = usePlanetHook();

  const columns = [
    {
      key: 'name',
      label: 'name',
      sortable: false,
    },
    {
      key: 'gravity',
      label: 'gravity',
    },
    {
      key: 'diameter',
      label: 'diameter',
    },
    {
      key: 'climate',
      label: 'climate',
    },
    {
      key: 'terrain',
      label: 'terrain',
    },
    {
      key: 'surface_water',
      label: 'Surface water',
    },
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
    setSelectedPlanet(character);
    toggleModal(true);
  }

  // Debounced search handler
  const debouncedSearch = debounce((value: string) => {
    setCurrentPage(1);
    fetchPlanets(1, value);
  }, 500);

  useEffect(() => {
    fetchPlanets();
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
        <TitleOfPage title="Star Wars Planets">
          <SearchInput
            onChange={debouncedSearch}
            placeholder="Search for Planets..."
          />
        </TitleOfPage>

        <TableLayout
          columns={columns}
          data={planets}
          isLoading={isLoading}
        />

        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* <ModalComponent
          isOpen={isModalOpen}
          onClose={() => toggleModal(false)}
          character={selectedFilm}
        /> */}
      </div>
    </DashboardLayout>
  );
}