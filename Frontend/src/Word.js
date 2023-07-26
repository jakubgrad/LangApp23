const Word = (props) => {
    const word = props.word
    const fetchWordDescription = props.fetchWordDescription
    return <span onClick={() => 
        fetchWordDescription(
            word
            .replaceAll(".","")
            .replaceAll(",","")
            .replaceAll("(","")
            .replaceAll(")","")
            .replaceAll("-","")
        )}>{word} </span>
}
export default Word;