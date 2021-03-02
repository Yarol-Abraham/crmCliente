export const smallAlertCSS = `
    w-full 
    text-sm 
    text-red-400 
    font-semibold 
    border-t-2 
    border-red-500 mb-2
`;

export const formAlertCSS = (width, widthColor) => {
    return `
    ${width}
    text-sm font-sans 
    font-semibold 
    text-center 
    rounded-md 
    text-gray-50
    uppercase 
    ${widthColor} py-2 
    `;
}
 