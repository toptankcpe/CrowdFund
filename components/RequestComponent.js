import ReadMoreText from 'read-more-less-react';
import 'read-more-less-react/dist/index.css'
import React, {useState} from 'react';
// import {Container} from "react-bootstrap";


import parse from 'html-react-parser';

import {
    Box,
    chakra,
    Container,
    Textarea,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    Divider,
    VisuallyHidden,
    List,
    ListItem,
    FormControl,
    FormLabel,
    Input,
    IconButton,
    FormHelperText,
    FormErrorMessage,
    useDisclosure
  } from '@chakra-ui/react';
  
export default function RequestComponent({ fourth }) {
  function ReadMore({children = 100}) {

    const text = children;

    const [isShow, setIsShowLess] = useState(true)
    const result = isShow ? text.slice(0, 100) : text;

    function toggleIsShow() {
        setIsShowLess((!isShow));
    }

    return(
        <p>
            {result}
            <span className="btn btn-link" onClick={toggleIsShow}>
                {isShow ? "Read More" : "Read Less"}
            </span>
        </p>
    )

}

    // const [readMore,setReadMore]=useState(false);
    // const extraContent=<div>
    //   <p className="extra-content">
    //     Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, consectetur neque ab 
    //     porro quasi culpa nulla rerum quis minus voluptatibus sed hic ad quo sint, libero 
    //     commodi officia aliquam! Maxime.
    //   </p>
    // </div>
    // const linkName=readMore?'Read Less << ':'Read More >> '

    const myFunction = () => {
        var dots = document.getElementById("dots");
        var moreText = document.getElementById("more");
        var btnText = document.getElementById("myBtn");
      
        if (dots.style.display === "none") {
          dots.style.display = "inline";
          btnText.innerHTML = "Read more";
          moreText.style.display = "none";
        } else {
          dots.style.display = "none";
          btnText.innerHTML = "Read less";
          moreText.style.display = "inline";
        }
      }
    // const executeOnClick = (isExpanded) => {
    //     console.log(isExpanded);
    // }
    
    
    
    return ( 
      <>
        
                
                    {fourth.requestDes && parse(fourth.requestDes)}

                    <Textarea border="3px solid" h="150px" backgroundColor="whiteAlpha.900"  name='comValue' type='text'   />

                  {/* <ReadMoreText
                      lines={1}
                      text={fourth.requestDes && parse(fourth.requestDes)}
                  /> */}
               
          

      </>


    //     <div className="App">
    //   <a className="read-more-link" onClick={()=>{setReadMore(!readMore)}}><h2>{linkName}</h2></a>
    //   {readMore && extraContent}
    // </div>
        

        
        //    fourth.requestDes && parse(fourth.requestDes)
        
        
   


    )

}