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
    fetchCharacters();
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
          character={selectedCharacter}
        />
      </div>
    </DashboardLayout>
  );
}