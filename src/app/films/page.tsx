"use client"

import { useEffect } from "react"
import DashboardLayout from "@/layouts/DashboardLayout"
import Pagination from "@/ui/components/common/Table/Pagination"
import TableLayout from "@/ui/components/common/Table/TableLayout"
import { debounce } from "lodash"
import ModalComponent from "@/ui/components/common/ModalComponent"
import SearchInput from "@/ui/components/common/SearchInput"
import { useFilmsHook } from "@/hooks/films/useFilmsHook"
import TitleOfPage from "@/ui/components/common/pages/TitleOfPage"
import { formatDateIsoTime } from "@/functions/DateHelpers"
import FilmModal from "@/ui/components/features/Modal/Films/FilmModal"

export default function Home() {
  const {
    films,
    currentPage,
    totalPages,
    isLoading,
    error,
    isModalOpen,
    selectedFilm,
    fetchFilms,
    setCurrentPage,
    setSelectedFilm,
    toggleModal,
  } = useFilmsHook();

  const columns = [
    {
      key: 'title',
      label: 'Title',
      sortable: false,
    },
    {
      key: 'director',
      label: 'Director',
    },
    {
      key: 'created',
      label: 'Created',
      render: (row: Film) => formatDateIsoTime(row.created).fullFormat

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
    setSelectedFilm(character);
    toggleModal(true);
  }

  // Debounced search handler
  const debouncedSearch = debounce((value: string) => {
    setCurrentPage(1);
    fetchFilms(1, value);
  }, 500);

  useEffect(() => {
    fetchFilms();
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
        <TitleOfPage title="Star Wars Films">
          <SearchInput
            onChange={debouncedSearch}
            placeholder="Search for films..."
          />
        </TitleOfPage>

        <TableLayout
          columns={columns}
          data={films}
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
          name={selectedFilm?.title}
        >
          <FilmModal
            film={selectedFilm || null}
          />
        </ModalComponent>
      </div>
    </DashboardLayout>
  );
}