import {Order} from "~/types/Order";
import {ListMeta} from "~/types/DataTable";
import ApiError from "~/types/ApiError";

export const useOrder = ({isInfinite = false}) => {

    const isInfiniteScroll = ref(isInfinite)

    const fetching = ref(false)

    const paginationOptions = ref<{
        list: Array<Order>,
        listMeta: ListMeta
    }
    >({
        list: [],
        listMeta: {
            current_page: 0,
            last_page: 0,
            from: 0,
            to: 0,
            per_page: 20,
            total: 0,
        },
    })

    function appendRows(rows: Array<Order>) {
        useEach(rows, (row: Order) => {
            const exist = useFind(paginationOptions.value.list, {id: row.id});
            if (!exist) {
                paginationOptions.value.list.push(row);
            }
        });
    }

    async function getList(
        options: {
            per_page: number;
            page: number;
            sort?: string;
        } = {
            per_page: 10,
            page: 1,
            sort: '-created_at'
        },
        filters: object = {}
    ) {
        try {
            let computedFilters = Object.entries(filters).reduce((newObject: any, [key, value]) => {
                newObject[`filter[${key}]`] = value;
                return newObject;
            }, {});

            fetching.value = true;
            const {data, error} = await useApi('/orders', {
                method: 'GET',
                params: {
                    ...options,
                    ...computedFilters,
                    include: 'customer.avatar,seller.avatar,seller.businessInformation,orderDetails.product.photos,orderDetails.options,orderDetailsCount',
                },
            });

            if (isInfiniteScroll.value) {
                appendRows(data.value?.data as Array<Order>)
            } else {
                paginationOptions.value.list = data.value?.data as Array<Order>
            }
            paginationOptions.value.listMeta = data.value?.meta as ListMeta

            if (error.value) {
                throw new ApiError(error.value);
            }
            return data;
        } catch (error) {
            throw error;
        } finally {
            fetching.value = false
        }
    }

    return {
        getList,
        paginationOptions,
        fetching,
        isInfiniteScroll
    }
}