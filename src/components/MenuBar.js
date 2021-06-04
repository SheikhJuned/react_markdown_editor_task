import React, {useContext, useEffect, useState} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MarkDownScreen from "./MarkDownScreen";
import ReactMarkdown from "react-markdown";
import Fab from "@material-ui/core/Fab";
import SaveIcon from '@material-ui/icons/Save';

import {LoginContext} from "../contexts";


const axios = require('axios').default;

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function MenuBar({enableDrawer, setenableDrawer, markdowns}) {

    const {jwt}=useContext(LoginContext)


    console.log("MenuBar");
    const classes = useStyles();
    // const [enableDrawer, setenableDrawer] = React.useState(false);
    console.log("markdowns[0]", markdowns[0]);

    // const [newMarkDown,setnewMarkDown]=useState(markdowns[0]===undefined  ? {"title":"your title","markdown":"# start some markdown"}: markdowns[0])

    const [markdownlist, setMarkdownList] = useState(markdowns)
    const [newMarkDown, setnewMarkDown] = useState({"title": "your title", "markdown": "# start some markdown"})
    const [currectMarkdown, setCurrentMarkdown] = useState(null)
    const [isloading, setisloading] = useState(false)


    const [textareaValue, settextareaValue] = useState('')



    const [selectedListid, setselectedListid] = useState(0)
    // const [newmarkdown,setnewmarkdowns]=useState(markdowns)

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setenableDrawer(!enableDrawer)
    };


    const create_markdown_in_server = async () => {

        const title=prompt("please enter title")
        console.log("title",title);



        if (title===null){
            return
        }

        if(title.length<=1){
            alert("mini 2 char required")
            return
        }

        setisloading(true)
        await axios.post('http://localhost:4000/api/posts/create', {
            "title": title,
            "markdown": "# start your markdown"

        }, {
            headers: {
                'auth-token': jwt
            }
        })
            .then(function (response) {
                // handle success
                console.log(response.data.markdown);
                // setMarkdowns(response.data.markdowns)
                setMarkdownList([...markdownlist, response.data.markdown])
                setCurrentMarkdown(response.data.markdown)

                settextareaValue(response.data.markdown.markdown)
                console.log(response.data.markdown,"when creating");
                setselectedListid(markdownlist.length)
                setisloading(false)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                alert("error:", error.toString())
                setisloading(false)
            })
    }



    const save_marDown_in_server=async ()=>{
        await axios.post('http://localhost:4000/api/posts/update', {
            "_id": markdownlist[selectedListid]._id,
            "markdown": textareaValue

        }, {
            headers: {
                'auth-token': jwt
            }
        })
            .then(function (response) {
                setMarkdownList(markdownlist.map((val,index)=>{
                    if(index===selectedListid){
                        val['markdown']=textareaValue
                        return val
                    }else {
                        return val
                    }
                }))
             alert("success")
            })
            .catch(function (error) {
             alert("fail")
                // handle error

            })
    }


    useEffect(() => {
        if(markdownlist.length!==0){
            settextareaValue(markdownlist[0].markdown)
        }
    }, [])


    useEffect(() => {

    }, [isloading, selectedListid, currectMarkdown])


    function handleListItemClick(event, number) {
        // console.log(event,number,"number")

        setselectedListid(number)
        setCurrentMarkdown(markdownlist[number])
        settextareaValue(markdownlist[number].markdown)

    }

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Button variant="contained" color="primary" onClick={create_markdown_in_server}>create</Button>

            {/*<Button variant="contained" color="secondary" onClick={()=>{setMarkdownList.map((val,index)=>{*/}
            {/*    if(index!==selectedListid){*/}
            {/*        return val*/}
            {/*    }*/}
            {/*    */}
            {/*})}}>delete</Button>*/}

            <List>
                {/*{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (*/}
                {markdownlist.map((markdown, index) => (
                    <>
                        <ListItem button
                                  key={markdown._id}
                                  selected={selectedListid === index}
                                  onClick={(event) => handleListItemClick(event, index)}
                        >
                            <ListItemIcon>{index + 1}</ListItemIcon>
                            <ListItemText primary={markdown.title}/>

                        </ListItem>
                        <Divider/>
                    </>
                ))}
            </List>

        </div>
    );

    return (
        <div>

            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    {/*<Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>*/}
                    {/*{children}*/}
                    {/*<MarkDownScreen currectMarkdown={newMarkDown} />*/}
                    {/*{markdowns.length===0  ?"please create new list":<MarkDownScreen currectMarkdown={markdownlist[parseInt(selectedListid)]} />}*/}

                    {/*<MarkDownScreen currectMarkdown={markdownlist[parseInt(selectedListid)]} >{markdownlist[parseInt(selectedListid)].markdown}</MarkDownScreen>*/}

                    <div style={{display: "flex"}}>

                        <textarea className={"textarea"} value={textareaValue} onChange={(event => {settextareaValue(event.target.value)})}
                        />
                        <div className={"markdown"}>
                            <ReactMarkdown>{textareaValue}</ReactMarkdown>
                            {markdownlist.length!==0 &&
                            <div className={"circle-div"}>
                                <Fab onClick={save_marDown_in_server} color="primary" aria-label="add">
                                    <SaveIcon />
                                </Fab>
                            </div>
                            }


                        </div>

                    </div>


                    <Drawer anchor={anchor} open={enableDrawer} onClose={toggleDrawer(anchor, false)}>
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
