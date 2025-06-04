
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHome,
	faBuilding,
	faDoorOpen,
	faChessRook,
	faShip,
	faCity,
	faIgloo

} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRouter } from "next/router";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { useBreakpointValue } from '@chakra-ui/react'
import FilterDialog from "./FilterDialog";
import { useDisclosure, Button, Container, Box, Flex } from "@chakra-ui/react";

const FilterSection = () => {
	const GET_HOUSE_TYPES = gql`
		query GetHousingTypes {
			getHousingTypes
		}
	`;

	const FILTER_BY_HOUSETYPE = gql`
		query filterType($type: String!) {
			filterByHouseType(type: $type) {
				housingType
				id
			}
		}
	`;

	const { data } = useQuery(GET_HOUSE_TYPES);
	const [filteredAds] = useLazyQuery(FILTER_BY_HOUSETYPE);
	const router = useRouter();
	const [selectedType, setSelectedType] = useState(null);
	const { isOpen, onOpen, onClose } = useDisclosure()
	const searchByHouseType = (type: any) => {
		setSelectedType(type);
		filteredAds({ variables: { type: selectedType } });
		router.push(`/searchResults/type-results?type=${type}`);
	};

	const getIconForType = (type: any) => {
		switch (type) {
			case "Chalet":
				return <FontAwesomeIcon icon={faHome} />;
			case "Appartement":
				return <FontAwesomeIcon icon={faBuilding} />;
			case "Maison":
				return <FontAwesomeIcon icon={faDoorOpen} />;
			case "Igloo":
				return <FontAwesomeIcon icon={faIgloo} />
			case "Maison":
				return <FontAwesomeIcon icon={faDoorOpen} />;
			case "Chateau":
				return <FontAwesomeIcon icon={faChessRook} />;
			case "Bateau":
				return <FontAwesomeIcon icon={faShip} />;
			case "Tour":
				return <FontAwesomeIcon icon={faCity} />;
			default:
				return <FontAwesomeIcon icon={faHome} />;
		}
	};

	const isMobile = useBreakpointValue({ base: true, md: false})
console.log(isMobile)
	const showHousingIcons = () => {

	}


	return (
		<Flex p="10px" alignItems='center' gap='5' justifyContent="center" className="filter-section" flex-wrap>
				 {data?.getHousingTypes?.slice(0, isMobile ? 4 : undefined).map((type, index) => (
					<div
						key={index}
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							margin: "10px",
							cursor: "pointer",
							color: selectedType === type ? "black" : "gray",
						}}
						onClick={() => searchByHouseType(type)}
					>
						{getIconForType(type)}
						<p style={{ fontSize: "12px", textAlign: "center" }}>{type}</p>
					</div>
				))}
			<Box
				borderRadius="full"
				bg="black"
				color="white"
				p={1}
				onClick={showHousingIcons}
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<path d="m9 18 6-6-6-6" />
				</svg>
			</Box>

			<Button onClick={onOpen} backgroundColor="#B4770A" color="white">
				Filtres
			</Button>
			{isOpen && <FilterDialog isOpen={isOpen} onClose={onClose} />}


		</Flex>
	);
};

export default FilterSection;