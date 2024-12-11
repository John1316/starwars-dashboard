type ChildrenProps = {
  children: React.ReactNode;
};

type DashboardLayoutProps = {
  children: React.ReactNode;
};

type TitleOfPageProps = {
  title: string,
  children: React.ReactNode;
};

type StarWarsDataState = {
  [key: string]: {
      data: string[];
      isLoading: boolean;
      error?: string;
  };
}