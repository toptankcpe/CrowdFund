import React, { useState } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Link,
    Heading
} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    FiCalendar,
    FiUser,
    FiDollarSign,
    FiBriefcase,
    FiSettings
} from 'react-icons/fi'
import { IoPawOutline } from 'react-icons/io5'
import NavItem from '../components/NavItem'

export default function SidebarCampaign({ setSelected2 }) {
    const [navSize, changeNavSize] = useState("large")
    const [tabName, setTabName] = useState()

    const handleSetTab = (tab) => {
        console.log("handleSetTab")
        setSelected2(tab)
        setTabName(tab)
    }
    

    return (
        <Flex
            
        >
            <Flex
             
                flexDir="row"
                w="100%"
                // alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >
              
                <NavItem navSize={navSize} icon={FiHome} onClick={()=> handleSetTab('My Raise Campaign')} active={tabName==='My Raise Campaign'} title="My Raise Campaign"  />
                <NavItem navSize={navSize} icon={FiHome} onClick={()=> handleSetTab('My Fund Campaign')} active={tabName==='My Fund Campaign'} title="My Fund Campaign"  />
                {/* <NavItem navSize={navSize} icon={FiCalendar} onClick={()=>handleSetTab('Comment')} active={tabName==='Comment'} title="Comment" />
                <NavItem navSize={navSize} icon={FiCalendar} onClick={()=>handleSetTab('Update')} active={tabName==='Update'} title="Update" />
                <NavItem navSize={navSize} icon={FiCalendar} onClick={()=>handleSetTab('Request')} active={tabName==='Request'} title="Request" /> */}
                {/* <NavItem navSize={navSize} icon={FiUser} title="Clients" /> */}
                {/* <NavItem navSize={navSize} icon={IoPawOutline} title="Animals" /> */}
                
               
              
                {/* <NavItem navSize={navSize} icon={FiBriefcase} title="Reports" /> */}
                {/* <NavItem navSize={navSize} icon={FiSettings} onClick={()=>handleSetTab('AI')} active={tabName==='AI'} title="AI" /> */}
            </Flex>

            
        </Flex>
    )
}