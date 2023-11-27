'use client';
export default function Search({placeholder}:{placeholder:string}){
    return(
        <div>
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input placeholder={placeholder}/>
            </div>
    );
}