
export const sidebarWidth = (width: number, active: boolean): any => {

  if (width < 768 && active === false) { return 0}
  if (width < 768 && active === true) { return 240}

  if (width >= 768 && width < 1170 && active === false) { return 70}
  if (width >= 768 && width < 1170 && active === true) { return 240}

  if (width >= 1170 && active === false) {return 70}
  if (width >= 1170 && active === true) {return 240}
}