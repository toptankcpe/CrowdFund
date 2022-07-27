import React, { useState } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Link,
    useColorModeValue,
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

export default function Sidebars({ setSelected }) {
    const [navSize, changeNavSize] = useState("large")
    const [tabName, setTabName] = useState()

    const handleSetTab = (tab) => {
        console.log("handleSetTab")
        setSelected(tab)
        setTabName(tab)
    }

    return (
        <Flex h='1400px' maxHeight='1400px'>
        <Flex
            pos="sticky"
            // left="5"
            h="100%"
            // marginTop="2.5vh"
            boxShadow="0 16px 48px 0 rgba(0, 0, 0, 0.3)"
            // borderRadius={navSize == "small" ? "15px" : "30px"}
            w={navSize == "small" ? "75px" : "300px"}
            flexDir="column"
            justifyContent="space-between"
            // bg={useColorModeValue('gray.300', 'gray.500')}
            // color={useColorModeValue('gray.700', 'gray.200')}
            
        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >
                <IconButton
                    background="none"
                    mt={5}
                    _hover={{ background: 'none' }}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize == "small")
                            changeNavSize("large")
                        else
                            changeNavSize("small")
                    }}
                /> 
                {/* <NavItem navSize={navSize} icon={FiHome} onClick={()=> handleSetTab('Dashboard')} active={tabName==='Dashboard'} title="Dashboard" description="This is the description for the dashboard." /> */}
                <NavItem navSize={navSize} icon={FiDollarSign} onClick={()=>handleSetTab('Create')} active={tabName==='Create'} title="Create" />
                <NavItem navSize={navSize} icon={FiCalendar} onClick={()=>handleSetTab('Campaign')} active={tabName==='Campaign'} title="Campaign" />
                {/* <NavItem navSize={navSize} icon={FiUser} title="Clients" /> */}
                {/* <NavItem navSize={navSize} icon={IoPawOutline} title="Animals" /> */}
                
                
              
                {/* <NavItem navSize={navSize} icon={FiBriefcase} title="Reports" /> */}
                <NavItem navSize={navSize} icon={FiSettings} onClick={()=>handleSetTab('AI')} active={tabName==='AI'} title="Generator" />
                <NavItem navSize={navSize} icon={FiSettings} onClick={()=>handleSetTab('Redeem')} active={tabName==='Redeem'} title="Redeem" />
                <NavItem navSize={navSize} icon={FiSettings} onClick={()=>handleSetTab('Badge')} active={tabName==='Badge'} title="Badge" />


                
            </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                mb={4}
            >
                <Divider display={navSize == "small" ? "none" : "flex"} />
                {/* <Flex mt={4} align="center">
                    <Avatar size="sm" src="avatar-1.jpg" />
                    <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm">Sylwia Weller</Heading>
                        <Text color="gray">Admin</Text>
                    </Flex>
                </Flex> */}
            </Flex>
        </Flex>
        </Flex>
    )
}