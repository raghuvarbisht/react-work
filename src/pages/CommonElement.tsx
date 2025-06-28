
import Button from '../components/common/Button/Button';
import InputText from '../components/common/Input/InputText';
import Dropdown from '../components/common/Dropdown/Dropdown';
import MultiSelectDropdown from '../components/common/MultiSelectDropdown/MultiSelectDropdown';
import RadioButton from '../components/common/RadioButton/RadioButton';

import CheckboxGroup from '../components/common/Checkbox/CheckboxGroup';
import React , {useState , useCallback} from 'react';

import Menu from '../components/common/Menu/Menu';
import FileInput from '../components/common/FileInput/FileInput';
import Textarea from '../components/common/Textarea/Textarea';

import Table from '../components/common/Table/Table';

import Modal from '../components/common/Modal/Modal';
import Carousel from '../components/common/Carousel/Carousel';

const CommonElement = () => {

    const options = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'HTML', value: 'html' },
    { label: 'CSS', value: 'css' },
    { label: 'JS', value: 'js' },
    { label: 'Java', value: 'java' },
    { label: 'Dotnet', value: 'dotnet' },
    { label: 'Python', value: 'python' },
    ];
    const menuItems = 
    {
    label : 'Men',
    icon:'',
    subItems: ['Tshirts' ,'Shirts', 'pants' ]
    }

    const [framework, setFramework] = useState('');
    const [selectedFrameworks, setSelectedFrameworks] = useState(['react']);
    const [gender, setGender] = useState('male');

    const [skills, setSkills] = useState(['react']);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const [selectedFile, setSelectedFile] = useState<string>('');

    const handleFileChange = (files: FileList | null) => {
        if (files && files.length > 0) {
            setSelectedFile(files[0].name);
        }
    };

    const [bio, setBio] = useState('');

    const columns = [
        { label: 'ID', accessor: 'id', sortable: true },
        { label: 'Name', accessor: 'name', sortable: true },
        { label: 'Email', accessor: 'email', sortable: true },
        { label: 'Role', accessor: 'role', sortable: false },
      ];
      
      const data = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
        { id: 3, name: 'Bob Brown', email: 'bob@example.com', role: 'Viewer' },
      ];

      type User = {
        id: number;
        name: string;
        email: string;
        role: string;
      };
      
      const [selectedRows, setSelectedRows] = useState<User[]>([]);

    const handleEdit = (row: any) => {
        alert(`Edit user: ${row.name}`);
    };

    const handleDelete = (row: any) => {
        alert(`Delete user: ${row.name}`);
    };
   
    const handleSelectionChange = (rows: any[]) => {
        console.log(rows)
        // setSelectedRows(rows);
      }
    
   /*
    const handleSelectionChange = useCallback((rows: any[]) => {
        setSelectedRows(rows);
      }, [selectedRows]);

    */  

    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<{ name: string; description: string } | null>(null);
  
    const handleOpen = () => {
      setSelectedData({
        name: 'React Modal',
        description: 'This is a reusable modal with dynamic data.',
      });
      setModalOpen(true);
    };

    const slides = [
        {
          image: "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2025/6/23/e3ac3104-c764-4b65-974f-17d1dddf284b1750699275694-clearance-sale-desktop-KV.gif",
          caption: "Summer Sale"
        },
        {
          image: "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/25/9be788ff-39a4-4214-99d0-fc97505aae5a1658752545685-USPA_Desk_Banner.jpg",
          caption: "New Arrivals"
        },
        {
          image: "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/6/27/53b4daed-cd2c-4111-86c5-14f737eceb351656325318973-Handbags_Desk.jpg",
          caption: "Big Discounts"
        }
      ];

    return (
        <div style={{width: "99%"}}>  

            <div style={{width: "100%", margin:"10px" , padding:"10px"}}>
                <Carousel slides={slides} interval={3000} />
            </div>
 
            
            <div style={{
                    width: "50%", 
                    border:"1px solid blue", 
                    margin:"10px" , 
                    padding:"10px" , 
                    height: "200px",
                    background:"grey"
                }}>
                <div> Menu </div>
                <Menu item={menuItems}/>
            </div>

            <div style={{width: "50%", border:"1px solid blue", margin:"10px" , padding:"10px"}}>
                <h3>Input box</h3>
                <InputText
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                />
                <h3> output: {formData.name}</h3>
            </div>  
            <div style={{width: "50%", border:"1px solid blue", margin:"10px",padding:"10px"}}>
                <h3>Button</h3>                
                <Button label="Add to cart" />
            </div>         
            <div style={{width: "50%", border:"1px solid blue", margin:"10px" , padding:"10px"}}> 
              <h3>Select box</h3> 
              <Dropdown
                label="Choose Framework"
                name="framework"
                value={framework}
                onChange={setFramework}
                options={options}
              />
              <h3>output : {framework} </h3>
            </div>

            <div style={{width: "50%", border:"1px solid blue", margin:"10px" , padding:"10px"}}> 
              <h3>Multiselect </h3>
              <MultiSelectDropdown
                label="Select Frameworks"
                name="frameworks"
                selectedValues={selectedFrameworks}
                onChange={setSelectedFrameworks}
                options={options}
                placeholder="Choose frameworks"
              />
              <h3>output: {selectedFrameworks.join(', ')}</h3>
            </div>

            <div style={{width: "50%", border:"1px solid blue", margin:"10px" , padding:"10px"}}> 
                <h3>Radiobutton </h3>
                <RadioButton
                    label="Male"
                    name="gender"
                    value="male"
                    checked={gender === 'male'}
                    onChange={(e) => setGender(e.target.value)}
                />
                <RadioButton
                    label="Female"
                    name="gender"
                    value="female"
                    checked={gender === 'female'}
                    onChange={(e) => setGender(e.target.value)}
                />
                <h3> output: {gender}</h3>
            </div>
            <div style={{width: "50%", border:"1px solid blue", margin:"10px" , padding:"10px"}}>                
                <CheckboxGroup
                    label="Select Skills"
                    name="skills"
                    options={options}
                    selected={skills}
                    onChange={setSkills}
                />
               <h3>output : {skills.join(', ')}</h3> 
            </div>
            <div style={{width: "50%", border:"1px solid blue", margin:"10px" , padding:"10px"}}>
                <FileInput label="Updoad a File " onChange={handleFileChange} />
                {selectedFile && <p>Selected File: {selectedFile}</p>}
            </div>
            <div style={{width: "50%", border:"1px solid blue", margin:"10px" , padding:"10px"}}>
                <Textarea
                    label="Tell us about yourself"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                />
            </div>

            <div style={{width: "100%", border:"1px solid blue", margin:"10px" , padding:"10px"}}>
                <Table 
                    columns={columns}
                    data={data}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onSelectionChange={handleSelectionChange}
                    />

                    <div style={{ margin: '16px' }}>
                    <h4>Selected Rows:</h4>
                    <pre>{JSON.stringify(selectedRows, null, 2)}</pre>
                    </div>
            </div>

            <div style={{width: "100%", border:"1px solid blue", margin:"10px" , padding:"10px"}}>
                <button onClick={handleOpen}>Open Modal</button>

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    title={selectedData?.name}
                >
                    <p>{selectedData?.description}</p>
                </Modal>
            </div>

            

            
        </div>
    )
}

export default CommonElement