import { z } from "zod";

const formSchema = z.object({
    restaurantName: z.string().min(1, "Restaurant name is required"),
    city: z.string().min(1, "city is required"),
    country: z.string().min(1, "country is required"),
    deliveryPrice: z
        .string()
        .nonempty({ message: "Delivery price is required" }) 
        .transform((val) => Number(val))                     
        .refine((val) => !isNaN(val), { message: "Delivery price must be a number" })
        .refine((val) => val >= 0, { message: "Delivery price must be minimum 0" }),
    estimatedDeliveryTime: z
        .string()
        .nonempty({ message: "Estimated delivery time is required" }) 
        .transform((val) => Number(val))                     
        .refine((val) => !isNaN(val), { message: "Estimated delivery time must be a number" })
        .refine((val) => val >= 0, { message: "Estimated delivery time must be minimum 0" }),
    cuisines: z.array(z.string()).nonempty({message: "Please select at least one item"}),
    menuItems: z.array(z.object({
        name: z.string().min(1, "name is required"),
        price: z.coerce.number().min(1, "price is required"),
        })
    ),    
    imageFile: z.instanceof(File, {message:"Image is required"}),
})

type Props = {
    onSave: (restaurantFormData: FormData)=> void;
    isLoading: boolean;
}

const ManageRestaurantForm = ({onSave, isLoading}: Props) => {

}

export default ManageRestaurantForm;