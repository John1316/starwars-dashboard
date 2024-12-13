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
type EntityProps = {
  keyName: string,
  entity: {name: string , id: number | string}
}
type ErrorPageProps = {
  btnText?: string,
  title?: string,
  text1: string,
  text2: string
}