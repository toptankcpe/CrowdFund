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
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}>
        <Container as={Stack} maxW={'6xl'} py={10}>
            <SimpleGrid
            templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr 1fr' }}
            spacing={8}>
            <Stack spacing={6}>
                <Box>
                <Text color={useColorModeValue('gray.700', 'white')}>Topstarter</Text>
                </Box>
                <Text fontSize={'sm'}>
                © 2022 Chakra Templates. All rights reserved
                </Text>
            </Stack>
            <Stack align={'flex-start'}>
                <Text>Product</Text>
                <Link href={'#'}>Overview</Link>
                <Link href={'#'}>Features</Link>
                <Link href={'#'}>Tutorials</Link>
                <Link href={'#'}>Pricing</Link>
                <Link href={'#'}>Releases</Link>
            </Stack>
            <Stack align={'flex-start'}>
                <Text>Company</Text>
                <Link href={'#'}>About</Link>
                <Link href={'#'}>Press</Link>
                <Link href={'#'}>Careers</Link>
                <Link href={'#'}>Contact</Link>
                <Link href={'#'}>Partners</Link>
            </Stack>
            <Stack align={'flex-start'}>
                <Text>Support</Text>
                <Link href={'#'}>Help Center</Link>
                <Link href={'#'}>Terms of Service</Link>
                <Link href={'#'}>Legal</Link>
                <Link href={'#'}>Privacy Policy</Link>
                <Link href={'#'}>Status</Link>
            </Stack>
            <Stack align={'flex-start'}>
                <Text>Follow Us</Text>
                <Link href={'#'}>Facebook</Link>
                <Link href={'#'}>Twitter</Link>
                <Link href={'#'}>Dribbble</Link>
                <Link href={'#'}>Instagram</Link>
                <Link href={'#'}>LinkedIn</Link>
            </Stack>
            </SimpleGrid>
        </Container>
        </Box>
    )
}