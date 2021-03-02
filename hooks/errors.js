
const catchError = fn => {
    return () =>{
        fn().catch( err => {
            console.log("error")
        } );
    };
}
 
export default catchError;