type Ioptions = {
  page?: number;
  limit?: number;
  sortBY?: string;
  sortOrder?: string;
};

const paginationSortingHelper = (options: Ioptions) => {
  console.log(options);
};

export default paginationSortingHelper;
