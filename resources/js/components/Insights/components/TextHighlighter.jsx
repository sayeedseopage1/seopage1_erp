import PropsTypes from 'prop-types';
import _ from 'lodash';

const TextHighlighter = ({
        searchWords="",
        textToHighlight=""
    }) => {
        const splitText = (text) => {
            // split text into array of letters
            const searchText = searchWords.split("");
            const letters = text.split("");
            let sentence = [];
            
            
            letters.map((letter, index) => {
                if(_.lowerCase(searchText).includes(_.lowerCase(letter)) && letter !== " ") {
                    sentence.push(<span key={`letter(${letter}-${index})`} className="__highlight"> {letter} </span>);
                }else if(searchText.includes(letter) && letter === " ") {
                    sentence.push(<span key={`letter(${letter}-${index})`} className="__highlight __whitespace"> &nbsp; </span>);
                }else if(letter === " ") {
                    sentence.push(<span key={`letter(${letter}-${index})`} className="__whitespace"> &nbsp; </span>);
                }else {
                    sentence.push(<span key={`letter(${letter}-${index})`}> {letter} </span>);
                }
            } );
    
            return sentence;
        };

        return textToHighlight ? <div className='cnx__text'>{splitText(textToHighlight)}</div> : "";
    }

    TextHighlighter.propTypes = {
        searchWords: PropsTypes.string,
        textToHighlight: PropsTypes.string
    }


    export default TextHighlighter;