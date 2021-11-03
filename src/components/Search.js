import React,{useState,useEffect} from 'react';
import axios from 'axios';

const Search = () =>{
    const [term,setTerm] = useState("Javascript");
    const [results,setResults] = useState([])
    console.log(term);

    const Key = 'AIzaSyCvlaEQ8lpGCrnLb36EjFX1P_W9QpY7cTA';

    useEffect(() => {
        const Books = async () =>{
            const {data} = await axios.get('https://www.googleapis.com/books/v1/volumes',{
                params : {
                    q : term,
                    Key : Key
                }
            })
            setResults(data.items);
            console.log(data.items);
        }

        const timeoutId = setTimeout(()=>{
            if(term){
                Books()
            }
        },500)

        return () =>{
            clearTimeout(timeoutId)
        }
        
    }, [term])


    const renderedResult = results.map((result)=>{
        return (
            // <div key = {result.id}>
            //     <h1>{result.volumeInfo.title}</h1>
            //     <p>{result.volumeInfo.subtitle}</p>
            // </div>
            <div className="item" key = {result.id}>
                  <div className="content">
                  <img src={result.volumeInfo.imageLinks.thumbnail} alt="" />
                  {result.volumeInfo.title} <br />
                  <span>{result.volumeInfo.subtitle}</span>
                  </div>

            </div>
        )
    })

    return (
        <div className="ui form">
            <div className="field">
                  <label>Enter Book Name</label>
                  <input
                     onChange ={(e)=>{setTerm(e.target.value)}} 
                     type="text"
                     value ={term}
                      />
            </div>
            <div className="ui celled list">
                 {renderedResult}
            </div>
        </div>
    )
}

export default Search;


// flowers+inauthor:keyes&key=yourAPIKey