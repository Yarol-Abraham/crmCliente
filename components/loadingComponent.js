import ButtonCSS from './UI/buttons';
const LoadingComponent = () => {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
          <button type="button" className={ButtonCSS('bg-red-300', 'bg-red-100' ,'w-full md:w-1/2' )} disabled>
           Cargando...
          </button>
      </div> 
      );
}
 
export default LoadingComponent;