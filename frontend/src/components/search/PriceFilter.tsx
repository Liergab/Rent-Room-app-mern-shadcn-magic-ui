
type Props = {
    selectedPrice? : number;
    onChange: (values?:number) => void
}
const PriceFilter = ({selectedPrice, onChange}:Props) => {
  return (
    <div >
        <h4 className='text-base font-semibold mb-2'>Max Price</h4>
        <select 
          value={selectedPrice} 
          onChange={(event) => onChange(event.target.value ? parseInt(event.target.value) : undefined)}
        >
            <option value="">Select Max Price</option>
            {[200, 500, 1000, 3000, 5000, 10000, 20000].map((price) => (
                <option value={price} key={price}>{price}</option>
            ))}

        </select>
    </div>
  )
}

export default PriceFilter