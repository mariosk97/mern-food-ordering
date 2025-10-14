import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";


type Props = {
    onChange: (value: string)=> void;
    sortOption: string;
}

const SORT_OPTIONS =[
    {
        label: "Best match",
        value: "bestMatch"
    },
    {
        label: "Delivery price",
        value: "deliveryPrice"
    },
    {
        label: "Estimated delivery time",
        value: "estimatedDeliveryTime"
    },
]

const SortOptionsDropdown = ({ onChange, sortOption }: Props) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
                <Button variant="outline" className="w-full">
                    Sort by: {sortOption}
                </Button>
            </DropdownMenuTrigger>
        </DropdownMenu>
    )
}

export default SortOptionsDropdown;