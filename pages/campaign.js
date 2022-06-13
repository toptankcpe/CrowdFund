import Sidebar from '../components/Sidebar'
import { Flex, Text, IconButton, Box, useColorModeValue,HStack,Heading,Stack,Button, Link} from '@chakra-ui/react'
import { useMoralis } from "react-moralis"
import { FiMenu } from 'react-icons/fi'

export default function Create() {
    const {isAuthenticated, authenticate, user, logout, isLoggingOut} = useMoralis()
    
    if(!isAuthenticated) {
    return (
    <>
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={8}>
        <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
        {/* <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
        /> */}
        <HStack spacing={8} alignItems={'center'}>
            <Box>
            <Heading fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}>
            <Link href={'/'}>
                <Text color={'blue.400'} as={'span'}>
                    Topstarter
                </Text>
            </Link>
        </Heading>
            </Box>
            {/* <HStack
            as={'nav'}
            spacing={4}
            display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
            ))}
            </HStack> */}
        </HStack>
        <Flex alignItems={'center'}>
            <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}>
            
            <Button
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'pink.400'}
                href={'#'}
                _hover={{
                bg: 'pink.300',
                }}
                onClick={() => authenticate({
                signingMessage: "Sign to login to Topstarter"
                })}>
                Login with Metamask
            </Button>
            </Stack>
        </Flex>
        </Flex>

        {/* {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
            {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
            ))}
            </Stack>
        </Box>
        ) : null} */}
    </Box>

    <Flex w="100%">
      <Sidebar />
      <Flex
        pos="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <Text>Click the
          <IconButton
            background="none"
            _hover={{ background: 'none' }}
            icon={<FiMenu />}
          />
        to resize the vertical navigation bar.</Text>
      </Flex>
    </Flex>
    </>
        )
    }
    

    if(isAuthenticated){
    return(
    <>
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={8}>
        <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
          {/* <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          /> */}
            <HStack spacing={8} alignItems={'center'}>
            <Link href={'/'}>
            <Box>
            <Heading fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}>
            
              <Text color={'blue.400'} as={'span'}>
                Topstarter
              </Text>
            
            </Heading>
            </Box>
            </Link>
            {/* <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack> */}
            </HStack>
            <Flex alignItems={'center'}>
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={'flex-end'}
              direction={'row'}
              spacing={6}>
              <Text>{user.getUsername()}</Text>
              <Button
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'pink.400'}
                href={'#'}
                _hover={{
                  bg: 'pink.300',
                }}
                onClick={() => logout({})}>
                Logout
              </Button>
            </Stack>
          </Flex>
        </Flex>

        {/* {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null} */}
      </Box>

       <Flex w="100%">
       <Sidebar />
       <Flex
         pos="absolute"
         top="50%"
         left="50%"
         transform="translate(-50%, -50%)"
       >
         <Text>Click the
           <IconButton
             background="none"
             _hover={{ background: 'none' }}
             icon={<FiMenu />}
           />
         to resize the vertical navigation bar.</Text>
       </Flex>
     </Flex>
     </>


        )

    
    }
    
}