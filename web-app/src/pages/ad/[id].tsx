import {
	ChakraProvider,
	Image,
	Text,
	Heading,
	Stack,
	Flex,
	Container,
	Box
} from "@chakra-ui/react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Slider from "@/components/annonces/Slider";
import Rating from "@/components/annonces/Rating";
import TagAd from "@/components/annonces/TagAd";
import Toggle from "@/components/annonces/Toggle";
import Payment from "@/components/annonces/Payment";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { AdsQuery, AdsQueryVariables } from "@/gql/graphql";

const GET_AD = gql`
query ad($adId: ID!) {
	ad(id: $adId) {
	  title
	  price
	  id
	  image
	  location
	  housingType
	  equipements
	  description
	}
  }
`;

export default function Ad() {
	const router = useRouter();
	const { id } = router.query;
	const { data } = useQuery(GET_AD, {
		variables: { adId: id as string },
	});

	if (data) {
		const { ad } = data;
console.log(ad)
		return (
			<ChakraProvider>
				<Navbar />
				<Slider image={ad.image}/>
				<Stack spacing={4} m="auto" width="84%" mt={5} textAlign="left">
					<Flex justifyContent="flex-start">
					<Box>
			<Image
				borderRadius="full"
				boxSize="80px"
				src={""}
				alt=""
			/>
		</Box>
					</Flex>
					<TagAd />
					<Text fontSize="2xl">{ad.title}</Text>
					<Text fontSize="1xl">{ad.location} </Text>
					<Rating />
				</Stack>
				<Stack margin="3%">
					<Flex
						width={"100%"}
						justifyContent="space-around"
						alignItems="center"
					>
						<Container alignContent={"center"}>
							<Toggle description={ad.description} equipements={ad.equipements}/>
						</Container>
						<Container alignContent={"center"}>
							<Payment price={ad.price} />
						</Container>
					</Flex>
				</Stack>
				<Footer />
			</ChakraProvider>
		);
	}
}
