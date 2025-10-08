import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisicesSection from "./CuisicesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  restaurantName: z.string().min(1, "Restaurant name is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  deliveryPrice: z
    .string()
    .nonempty({ message: "Delivery price is required" })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Delivery price must be a number" })
    .refine((val) => val >= 0, { message: "Delivery price must be at least 0" }),
  estimatedDeliveryTime: z
    .string()
    .nonempty({ message: "Estimated delivery time is required" })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Estimated delivery time must be a number" })
    .refine((val) => val >= 0, { message: "Estimated delivery time must be at least 0" }),
  cuisines: z.array(z.string()).min(1, "Select at least one cuisine"),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      price: z
        .string()
        .nonempty({ message: "Price is required" })
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val), { message: "Price must be a number" })
        .refine((val) => val >= 0, { message: "Price must be at least 0" }),
    })
  ),
  imageFile: z.instanceof(File, { message: "Image is required" }),
});


type RestaurantFormData = z.infer<typeof formSchema>

type Props = {
    onSave: (restaurantFormData: FormData)=> void;
    isLoading: boolean;
}

const ManageRestaurantForm = ({onSave, isLoading}: Props) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      restaurantName: "",
      city: "",
      country: "",
      deliveryPrice: "",
      estimatedDeliveryTime: "",
      cuisines: [],
      menuItems: [{ name: "", price: "" }],
      imageFile: undefined, 
    },
});


    const onSubmit = (formDataJson: RestaurantFormData) => {
        const formData = new FormData();

        formData.append("restaurantName", formDataJson.restaurantName);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("deliveryPrice", (formDataJson.deliveryPrice * 100).toString());
        formData.append("estimatedDeliveryTime", formDataJson.estimatedDeliveryTime.toString());
        formDataJson.cuisines.forEach((cuisine, index)=> {
          formData.append(`cuisines[${index}]`, cuisine);
        });
        formDataJson.menuItems.forEach((menuItem, index)=>{
          formData.append(`menuItems[${index}][name]`, menuItem.name)
          formData.append(`menuItems[${index}][price]`, (menuItem.price * 100).toString())
        });
        formData.append(`imageFile`, formDataJson.imageFile);

        onSave(formData);
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-50 p-10 rounded-lg">
                <DetailsSection />
                <Separator />
                <CuisicesSection />
                <Separator />
                <MenuSection />
                <Separator />
                <ImageSection />
                {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
            </form>
        </Form>
    )
}

export default ManageRestaurantForm;