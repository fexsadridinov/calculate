import { useState } from 'react';
import {
    Container,
    Typography,
    Select,
    MenuItem,
    TextField,
    InputLabel,
    FormControl,
    Button,
    Paper,
    Box,
} from '@mui/material';
import { propertyTaxRates, StatePropertyTax } from '../constants/propertytax';

const PropertyTaxPage = () => {
    const [selectedState, setSelectedState] = useState('');
    const [homeValue, setHomeValue] = useState('');
    const [estimatedTax, setEstimatedTax] = useState<number | null>(null);
    const [selectedRate, setSelectedRate] = useState<number | null>(null);

    const handleCalculate = () => {
        const stateData = propertyTaxRates.find((s) => s.state === selectedState);
        if (!stateData || isNaN(parseFloat(homeValue))) {
            setEstimatedTax(null);
            return;
        }

        const rate = stateData.rate;
        const value = parseFloat(homeValue);
        const tax = value * rate;

        setEstimatedTax(tax);
        setSelectedRate(rate);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 6 }}>
            <Typography variant="h4" gutterBottom>
                🏡 Property Tax Calculator
            </Typography>

            <Paper sx={{ p: 4, mb: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <FormControl fullWidth>
                        <InputLabel>State</InputLabel>
                        <Select
                            value={selectedState}
                            label="State"
                            onChange={(e) => setSelectedState(e.target.value)}
                        >
                            {propertyTaxRates.map((state: StatePropertyTax) => (
                                <MenuItem key={state.abbreviation} value={state.state}>
                                    {state.state}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        label="Estimated Home Value"
                        type="number"
                        fullWidth
                        value={homeValue}
                        onChange={(e) => setHomeValue(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleCalculate}
                        disabled={!homeValue || !selectedState}
                    >
                        Calculate
                    </Button>
                </Box>
            </Paper>

            {estimatedTax !== null && (
                <Paper sx={{ p: 4, backgroundColor: '#e8f5e9' }}>
                    <Typography variant="h6" gutterBottom>
                        📊 Estimated Property Tax
                    </Typography>
                    <Typography>
                        <strong>State:</strong> {selectedState}
                    </Typography>
                    <Typography>
                        <strong>Rate:</strong> {(selectedRate! * 100).toFixed(2)}%
                    </Typography>
                    <Typography>
                        <strong>Home Value:</strong> ${parseFloat(homeValue).toLocaleString()}
                    </Typography>
                    <Typography sx={{ mt: 2 }} variant="h5">
                        🧾 Estimated Annual Tax: <strong>${estimatedTax.toFixed(2)}</strong>
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 1 }}>
                        💸 Estimated Monthly Payment: <strong>${(estimatedTax / 12).toFixed(2)}</strong>
                    </Typography>

                </Paper>
            )}
        </Container>
    );
};

export default PropertyTaxPage;
