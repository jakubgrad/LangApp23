const Word = (props) => {
    const base = props.base === undefined
    ? "mennä" //a word for when base is absent
    : props.base
    //console.log("base: ", base);
    const word = props.word
    const fetchWordDescription = props.fetchWordDescription
    return <span onClick={() => 
        fetchWordDescription(
            word    //this was, and in most cases should be, word!
            .replaceAll(".","")
            .replaceAll(",","")
            .replaceAll("(","")
            .replaceAll(")","")
            .replaceAll("-","")
        )}>{word} </span>
}
export default Word;