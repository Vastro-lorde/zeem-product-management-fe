export const SearchBar = ({ value, onChange }) => {
    return (
      <div className="focus:outline-none focus:outline shadow-md shadow-gray-400 hover:shadow-sm hover:shadow-gray-700 rounded-lg p-2">
        <div className=" flex items-center w-full pl-3 gap-1">
            <p className=" w-8 text-center p-1 font-bold">🔍</p>
            <input
            type="text"
            placeholder="Search products..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className=" w-full px-4 py-2 pl-10 rounded-lg focus:outline-none"
            />
            {value && <p onClick={(e) => onChange('')} className=" w-8 text-center p-1 font-bold cursor-pointer hover:bg-slate-200 rounded-md text-gray-600">X</p>}
        </div>
        
      </div>
    );
};