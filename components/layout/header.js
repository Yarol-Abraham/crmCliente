import SignOff from '../sidebar/signOff';
const Header = () => {
    return (
    <>
        <header className="hidden sm:block sm:p-2 sm:bg-blue-400 sm:shadow-sm">
           <div className="flex justify-end">
                <SignOff nameComponent="header" />
           </div>
        </header>
    </>
    );
}
 
export default Header;