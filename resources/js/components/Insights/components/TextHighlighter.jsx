import PropsTypes from 'prop-types';
import _ from 'lodash';
import React from 'react';

const TextHighlighter = ({
        searchWords="",
        textToHighlight="",
        totalChars= 32,
    }) => {

        // avoid re-rendering

        const splitText = (text) => {
            // remove spacial characters (-, _, /, \, ., etc.)
            text =  text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '');
            // split text into array of letters
            const searchText = searchWords;
            // replace space to || for  
            // group by search words  
            // split by search words
            let letters = text.split(new RegExp(`(${searchText})`, 'gi'));

            
            
            let sentence = [];
            
            
            letters.map((letter, index) => {
                if(_.lowerCase(searchText).includes(_.lowerCase(letter)) && letter !== " ") {
                    sentence.push(<span key={`letter(${letter}-${index})`} className="__highlight"> 
                        {letter}
                    </span>);
                }else if(searchText.includes(letter) && letter === " ") {
                    sentence.push(<span key={`letter(${letter}-${index})`} className="__highlight __whitespace"> &nbsp; </span>);
                }else if(letter === " ") {
                    sentence.push(<span key={`letter(${letter}-${index})`} className="__whitespace"> &nbsp; </span>);
                }else {
                    sentence.push(<span key={`letter(${letter}-${index})`}>  
                        {letter.replace(/ /g, "\u00a0")}
                     </span>);
                }
            } );
     
            return sentence;
        };



        let textLength = textToHighlight.length;
        return textToHighlight ? <div className='cnx__text'>
            {splitText(textToHighlight).splice(0, totalChars)}
            {textLength > totalChars ? <span className='cnx__text__more'> ... </span> : ""}
        </div> : "";
    }

    TextHighlighter.propTypes = {
        searchWords: PropsTypes.string,
        textToHighlight: PropsTypes.string,
        totalChars: PropsTypes.number,
    }


    export default TextHighlighter;