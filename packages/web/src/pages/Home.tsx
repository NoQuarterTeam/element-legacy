import React, { FC } from "react"
import { RouteComponentProps, navigate } from "@reach/router"

import logo from "../public/logo.png"

import Spacer from "../components/styled/Spacer"
import { Heading, Box, Flex, Image, Button, Text, Icon } from "@chakra-ui/core"
import DemoTask from "../components/DemoTask"
import styled from "../application/theme"

const Home: FC<RouteComponentProps> = () => {
  // TODO make this better
  React.useEffect(() => {
    document.getElementsByTagName("body")[0].setAttribute("class", "homePage")
  }, [])

  const callMumTask = {
    name: "Call Mum",
    completed: true,
    element: { color: "orange", name: "Personal" },
    startTime: "",
    estimatedTime: "1h",
  }

  const emailTask = {
    name: "Send e-mails",
    completed: false,
    element: { color: "pink", name: "Work" },
    startTime: "",
    estimatedTime: "1h",
  }

  const mentorTask = {
    name: "Meet with mentor",
    completed: false,
    element: { color: "pink", name: "Work" },
    startTime: "16.00",
    estimatedTime: "1h",
  }

  const creativeTask = {
    name: "Be creative",
    completed: false,
    element: { color: "orange", name: "Personal" },
    startTime: "",
    estimatedTime: "2h30m",
  }

  return (
    <>
      <Box w="100vw" h="fit-content" p={5}>
        <Flex h="1200px">
          {/* Top content */}
          <Box w="100%">
            {/* Logo */}
            <Heading as="h1" size="xl" fontSize="30px" fontWeight="normal">
              element
              <span style={{ color: "orange", fontFamily: "Open sans" }}>
                .
              </span>
            </Heading>
            <Text pl="1px">life design</Text>
            {/* Banner */}
            <Flex flexDirection="column" justify="center" align="center">
              <Image src={logo} mt="60px" h="600px" mb="-220px" />
              <Heading as="h1" fontSize="3.7rem">
                Design your life.
              </Heading>
              <Heading as="h2" mb={5} fontWeight="normal">
                Be in your element.
              </Heading>
              <Button
                onClick={() => navigate("/register")}
                variant="outline"
                variantColor="black"
              >
                <Text>start</Text>
              </Button>
              <Spacer margin={120} />
              <Heading as="h2" mb={5} color="black" fontWeight="normal">
                Planner - Time tracker - Calender - Habit tracker
              </Heading>
            </Flex>
          </Box>

          {/* Right vertical line */}
          <Flex
            w="75px"
            mt={4}
            position="absolute"
            right="0"
            h="100%"
            direction="column"
            align="center"
          >
            <Text>バランス</Text>
            <Box mt={6} w="1px" backgroundColor="grey" h="100%"></Box>
          </Flex>
        </Flex>

        {/* Upper middle content */}
        <Box h="fit-content">
          {/* Left-line */}
          <Flex
            direction="column"
            h="100%"
            w="65px"
            mt={4}
            position="absolute"
            left="0"
            ml={6}
          >
            <Box position="absolute" w="30px">
              <Heading size="lg" fontWeight="normal">
                エレメント
              </Heading>
            </Box>
            <Box mt={6} ml={50} w="1px" backgroundColor="grey" h="100%"></Box>
          </Flex>

          {/* Content */}
          <Flex h="600px" mx="65px">
            <Flex w="50%" direction="column" justify="center" align="center">
              <Heading as="h2" fontWeight="normal">
                Built for peace.
              </Heading>
              <Heading as="h2" fontWeight="normal">
                Do more, less stress.
              </Heading>
            </Flex>
            <Flex
              w="50%"
              flexDirection="column"
              justify="center"
              align="center"
            >
              <Heading as="h4" size="lg" fontWeight="normal" mb={4}>
                Tue 1st
              </Heading>
              <DemoTask task={callMumTask} isDragging={false} hidden={false} />
              <DemoTask task={emailTask} isDragging={false} hidden={false} />
              <DemoTask task={mentorTask} isDragging={false} hidden={false} />
            </Flex>
          </Flex>

          <Flex h="600px" mx="65px">
            <Flex w="50%" direction="column" justify="center" align="center">
              <Box w="300px" h="fill-content" border="2px solid black">
                <Text pl={6} pb={2} pt={5}>
                  Work
                </Text>
                <Box backgroundColor="#8CCEA7" px={5} py={2} mx={1}>
                  <Flex align="center" justify="space-between" color="#3A8057">
                    <Text>Health</Text>
                    <Icon name="chevron-up" size="24px" />
                  </Flex>
                </Box>
                <Text pl={6} pt={5} ml={4}>
                  Exercise
                </Text>
                <Text pl={6} pt={5} ml={4}>
                  Diet
                </Text>
                <Text pl={6} pt={5}>
                  Travel
                </Text>
                <Text pl={6} py={5}>
                  Social
                </Text>
              </Box>
            </Flex>
            <Flex
              w="50%"
              flexDirection="column"
              justify="center"
              align="center"
            >
              <Heading as="h2" fontWeight="normal" textAlign="center">
                Balance each element of your life.
              </Heading>
            </Flex>
          </Flex>
        </Box>

        {/* Horizontal Line */}
        <Flex align="center">
          <Box h="1px" w="90%" ml={8} mr={4} backgroundColor="grey"></Box>
          <Text>エレメント</Text>
        </Flex>

        {/* Bottom middle content */}
        <Box h="fit-content">
          {/* Right vertical line */}
          <Flex
            w="75px"
            position="absolute"
            right="0"
            h="100%"
            direction="column"
            align="center"
          >
            <Box mt={6} w="1px" backgroundColor="grey" h="100%"></Box>
          </Flex>

          {/* Content */}
          <Flex h="500px" mx="65px">
            <Flex w="50%" direction="column" justify="center" align="center">
              <Heading as="h2" fontWeight="normal" textAlign="center">
                Track your daily habits and prioritise what makes you feel
                great!
              </Heading>
            </Flex>
            <Flex w="50%" justify="center" align="center">
              <StyledCircle selected={true} />
              <StyledCircle selected={true} />
              <StyledCircle selected={false} />
              <StyledCircle selected={false} />
              <StyledCircle selected={false} />
            </Flex>
          </Flex>

          <Flex h="500px" mx="65px">
            <Flex w="50%" direction="column" justify="center" align="center">
              <DemoTask task={emailTask} isDragging={false} hidden={false} />
              <DemoTask task={creativeTask} isDragging={false} hidden={false} />
              <Heading as="h2" size="xl" mt={4} color="grey">
                3h30m
              </Heading>
            </Flex>
            <Flex
              w="50%"
              flexDirection="column"
              justify="center"
              align="center"
            >
              <Heading as="h2" fontWeight="normal">
                See where your time actually goes.
              </Heading>
              <Heading as="h2" fontWeight="normal">
                Get back to the important stuff.
              </Heading>
            </Flex>
          </Flex>
        </Box>

        {/* TODO: Decide to keep */}
        {/* Horizontal Line */}
        {/* <Box
          h="1px"
          w="90%"
          right="0"
          position="absolute"
          backgroundColor="grey"
        /> */}

        {/* Bottom content */}
        <Box h="fit-content" w="100%">
          {/* TODO: Decide to keep */}
          {/* Left verical line */}
          {/* <Box h="100%" w="65px" mt={4} position="absolute" left="0" ml={6}>
            <Box mt={6} ml={50} w="1px" backgroundColor="grey" h="100%"></Box>
          </Box> */}

          {/* Content */}
          <Flex
            flexDirection="column"
            justify="center"
            align="center"
            w="100%"
            pt={200}
          >
            <Heading as="h1" fontWeight="normal" size="2xl" pb={5}>
              Personal and Team planning
            </Heading>
            <Heading as="h2" fontWeight="normal">
              Share elements of your life with your team, friends and family.
            </Heading>
            <Flex my={150} justify="center" align="center">
              {/* TODO: Theme colours? */}
              <StyledBigCircle color="#FF9292" />
              <StyledBigCircle color="#245A7A" />
              <StyledBigCircle color="#F7B002" />
            </Flex>
            <Button>Get started</Button>
            <Box mt={200} textAlign="center" w="80%" mb={50}>
              <Text fontSize="xl">Built by No Quarter</Text>
              <Text fontSize="xl" mt={5}>
                For us Element is a way to provide one place to pull together
                all the best lifestyle design tools and knowledge. Building it
                all into an effortless flow, piece by piece, brick by brick,
                helping us live life to the fullest.
              </Text>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  )
}

export default Home

const StyledCircle = styled(Box)<{ selected: boolean }>`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin: 0 ${p => p.theme.paddingM}; /* TODO: Still use this theme padding ? */
  background-color: ${p =>
    p.selected ? "#8ccea7" : "#EAEBEF"}; /* TODO: Theme colours? */
`

const StyledBigCircle = styled(Box)<{ color: string }>`
  border-radius: 50%;
  width: 90px;
  height: 90px;
  margin: 0 ${p => p.theme.paddingL}; /* TODO: Still use this theme padding ? */
  background-color: ${p => p.color};
`
