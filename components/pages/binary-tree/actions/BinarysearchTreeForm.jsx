import useForm, { ValidationTypes } from '../../../../hooks/useForm';
import { parseTree } from '../../../../functions/tree';

import FormInput from '../../../forms/FormInput';

export default function BinarysearchTreeForm({ handleVisualize }) {
    const formValidationRules = {
        binarysearchInput: [ValidationTypes.required]
    };

    const { formData, handleChange, errorMapping, setErrorMapping, handleSubmit } = useForm({
        initValues: {
            binarysearchInput: ''
        },
        validationRules: formValidationRules
    });

    const handleSubmitSuccess = () => {
        try {
            let parsedValue = JSON.parse(formData.binarysearchInput);
            let root = parseTree(parsedValue);

            handleVisualize(root);
        }
        catch (e) {
            setErrorMapping({
                binarysearchInput: typeof e === 'string' ? e : 'The input is not valid JSON.'
            })
        }

   
    } 

    
    return (
        <form className="mt-5" onSubmit={(e) => handleSubmit(e, handleSubmitSuccess)}>
            <FormInput 
            label="Binarysearch Input"
            error={errorMapping.binarysearchInput}
            inputProps={{
                name: 'binarysearchInput',
                type: 'text',
                value: formData.binarysearchInput,
                onChange: handleChange
            }} />
            <button type="submit" className="btn btn--primary w-full mt-10">Visualize Tree</button>
        </form>
    )
}