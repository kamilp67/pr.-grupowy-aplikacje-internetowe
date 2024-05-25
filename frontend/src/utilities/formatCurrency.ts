const CURRENCY_FORMATER = new Intl.NumberFormat('pl-PL', {
    currency: "PLN", style: "currency"
})

export const formatCurrency = (number: number) => {
    return CURRENCY_FORMATER.format(number)
}