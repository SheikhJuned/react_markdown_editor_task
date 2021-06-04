import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from "react-markdown";
import Fab from "@material-ui/core/Fab";
import SaveIcon from '@material-ui/icons/Save';
const axios = require('axios').default;

MarkDownScreen.propTypes = {

};

function MarkDownScreen({currectMarkdown}) {

    const [markdown,setMarkdown]=useState(currectMarkdown.markdown)
    console.log(currectMarkdown,"markdown in text editor");
    // const save_markdown=()=>{
    //     axios.post({"/"})
    // }



    return (
        <div style={{display:"flex"}}>

            <textarea className={"textarea"} onChange={(event => {setMarkdown(event.target.value)})}>{currectMarkdown.markdown}</textarea>
            {/*<ReactMarkdown  className={"markdown"}>{markdown}</ReactMarkdown>*/}
            <div className={"markdown"}>
                <ReactMarkdown >{markdown}</ReactMarkdown>
                <div   className={"circle-div"}>
                    <Fab  color="primary" aria-label="add">
                        <SaveIcon />
                </Fab></div>

            </div>

        </div>
    );
}

export default MarkDownScreen;
