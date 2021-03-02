const ButtonCSS = (btnColor, btnHoverColor, opciones) => {
    return `
    cursor-pointer
    font-semibold 
    rounded-lg 
    shadow-md 
    transition duration-500 ease-in-out
    hover:${btnHoverColor}
    focus:outline-none 
    focus:ring-2 
    focus:${btnColor} 
    focus:ring-opacity-75
    mx-2
    py-2 
    px-4 
    ${btnColor}
    text-white
    text-center
    ${opciones ? opciones : ''}
    `;
}
 
export default ButtonCSS;