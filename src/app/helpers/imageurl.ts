
export const imageUrl = (base_url: string, image: string) => {

  if (image) {
    return `${base_url}/upload/users/${image}`
  } else {
    return `${base_url}/upload/users/no-image`;
  }
  
}
