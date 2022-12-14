export const getPreviousAndNextIds = (items: Partial<{ id: number }>[], id?: string | number) => {
  if (id && items.length) {
    const parsedId = typeof id === 'string' ? parseInt(id) : id;
    const ids = items.map((i) => i.id);
    const currentIndex = ids.indexOf(parsedId);

    const previousIndex = currentIndex === 0 ? ids.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === ids.length - 1 ? 0 : currentIndex + 1;

    return {
      previousId: ids[previousIndex],
      nextId: ids[nextIndex]
    };
  }

  return {};
};
