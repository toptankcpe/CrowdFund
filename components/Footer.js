// import Image from 'next/image';
import {
    Button,
    IconButton,
    Flex,
    Heading,
    Container,
    Collapse,
    Icon,
    Avatar,
    HStack,
    Image,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Stack,
    SimpleGrid,
    Link,
    Box,
    Text,
    useBreakpointValue,
    useColorModeValue,
    useDisclosure } from '@chakra-ui/react';
import React, { Component } from "react";
import Slider from "react-slick";
import { useRouter } from 'next/router'



export default function Footer(){
    return(
    <Box
        bg={useColorModeValue('gray.800', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}>
        <Container as={Stack} maxW={'6xl'} py={10}>
            <SimpleGrid
            templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr 1fr' }}
            spacing={8}>
            <Stack spacing={6}>
                <Box>
                <Text color={useColorModeValue('gray.100', 'white')}>Topstarter</Text>
                </Box>
                <Text fontSize={'sm'} color={useColorModeValue('gray.100', 'white')}>
                © 2022 Chakra Templates. All rights reserved
                </Text>
            </Stack>
            <Stack align={'flex-start'}>
                <Text color={useColorModeValue('gray.100', 'white')}>Product </Text>
                <Link href={'#'} color={useColorModeValue('gray.100', 'white')} >Overview</Link>
                <Link href={'#'} color={useColorModeValue('gray.100', 'white')} >Features</Link>
                <Link href={'#'} color={useColorModeValue('gray.100', 'white')} >Tutorials</Link>
                <Link href={'#'} color={useColorModeValue('gray.100', 'white')} >Pricing</Link>
                <Link href={'#'} color={useColorModeValue('gray.100', 'white')} >Releases</Link>
            </Stack>
            <Stack align={'flex-start'}>
                <Text color={useColorModeValue('gray.100', 'white')}>Company</Text>
                <Link href={'#'} color={useColorModeValue('gray.100', 'white')}>About</Link>
                <Link href={'#'} color={useColorModeValue('gray.100', 'white')}>Press</Link>
                <Link href={'#'} color={useColorModeValue('gray.100', 'white')}>Careers</Link>
                <Link href={'#'} color={useColorModeValue('gray.100', 'white')}>Contact</Link>
                <Link href={'#'} color={useColorModeValue('gray.100', 'white')}>Partners</Link>
            </Stack>
            <Stack align={'flex-start'}>
                <Text color={useColorModeValue('gray.100', 'white')} >Support </Text>
                <Link href={'#'} color={useColorModeValue('gray.100', 'white')}>Help Center</Link>
                <Link href={'#'} color={useColorModeValue('gray.100', 'white')}>Terms of Service</Link>
                <Link href={'#'} color={useColorModeValue('gray.100', 'white')}>Legal</Link>
                <Link href={'#'} color={useColorModeValue('gray.100', 'white')}>Privacy Policy</Link>
                <Link href={'#'} color={useColorModeValue('gray.100', 'white')}>Status</Link>
            </Stack>
            <Stack align={'flex-start'}>
                <Text color={useColorModeValue('gray.100', 'white')} >Follow Us </Text>
                <Link href={'#'} color={useColorModeValue('gray.100', 'white')}>Facebook</Link>
                <Link href={'#'} color={useColorModeValue('gray.100', 'white')}>Twitter</Link>
                <Link href={'#'} color={useColorModeValue('gray.100', 'white')}>Dribbble</Link>
                <Link href={'#'} color={useColorModeValue('gray.100', 'white')}>Instagram</Link>
                <Link href={'#'} color={useColorModeValue('gray.100', 'white')}>LinkedIn</Link>
            </Stack>
            </SimpleGrid>
        </Container>
        </Box>
    )
}