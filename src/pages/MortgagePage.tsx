import { useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Box,
    Grid,
} from '@mui/material';

interface MortgageResults {
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
    extraPayment: number;
    effectiveMonths: number;
    effectiveTotalInterest: number;
}

const MortgagePage = () => {
    const [mortgageAmount, setMortgageAmount] = useState('');
    const [downPayment, setDownPayment] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [loanTermYears, setLoanTermYears] = useState('');
    const [extraPayment, setExtraPayment] = useState('');
    const [results, setResults] = useState<MortgageResults | null>(null);

    const calculateMortgage = () => {
        // Parse input values
        const totalMortgage = parseFloat(mortgageAmount);
        const down = parseFloat(downPayment) || 0;
        // Effective principal is mortgage amount minus down payment
        const principal = totalMortgage - down;
        const annualRate = parseFloat(interestRate);
        const years = parseFloat(loanTermYears);
        const extra = parseFloat(extraPayment) || 0;

        // Validate input
        if (isNaN(totalMortgage) || isNaN(annualRate) || isNaN(years) || principal < 0) {
            setResults(null);
            return;
        }

        const monthlyRate = annualRate / 100 / 12;
        const n = years * 12;
        let monthlyPayment: number;

        if (monthlyRate === 0) {
            monthlyPayment = principal / n;
        } else {
            monthlyPayment =
                (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) /
                (Math.pow(1 + monthlyRate, n) - 1);
        }

        const totalPayment = monthlyPayment * n;
        const totalInterest = totalPayment - principal;

        // Simulation with extra payment (if provided)
        let simBalance = principal;
        let simInterest = 0;
        let simMonths = 0;
        while (simBalance > 0.01) {
            const interestForMonth = simBalance * monthlyRate;
            let principalPayment = monthlyPayment - interestForMonth + extra;
            if (principalPayment > simBalance) {
                principalPayment = simBalance;
            }
            simBalance -= principalPayment;
            simInterest += interestForMonth;
            simMonths++;
            if (simMonths > 1000) break; // safeguard against infinite loop
        }

        setResults({
            monthlyPayment,
            totalPayment,
            totalInterest,
            extraPayment: extra,
            effectiveMonths: simMonths,
            effectiveTotalInterest: simInterest,
        });
    };

    return (
        <Container maxWidth="md" sx={{ mt: 6 }}>
            <Typography variant="h4" gutterBottom>
                🏠 Mortgage Calculator
            </Typography>
            <Paper sx={{ p: 4, mb: 4 }}>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                        e.preventDefault();
                        calculateMortgage();
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} component={'div' as any}>
                            <TextField
                                label="Mortgage Amount ($)"
                                fullWidth
                                value={mortgageAmount}
                                onChange={(e) => setMortgageAmount(e.target.value)}
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} component={'div' as any}>
                            <TextField
                                label="Down Payment ($)"
                                fullWidth
                                value={downPayment}
                                onChange={(e) => setDownPayment(e.target.value)}
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} component={'div' as any}>
                            <TextField
                                label="Annual Interest Rate (%)"
                                fullWidth
                                value={interestRate}
                                onChange={(e) => setInterestRate(e.target.value)}
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} component={'div' as any}>
                            <TextField
                                label="Loan Term (Years)"
                                fullWidth
                                value={loanTermYears}
                                onChange={(e) => setLoanTermYears(e.target.value)}
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} component={'div' as any}>
                            <TextField
                                label="Extra Payment (Optional)"
                                fullWidth
                                value={extraPayment}
                                onChange={(e) => setExtraPayment(e.target.value)}
                                type="number"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{ mt: 4 }}
                        type="submit"
                        disabled={!mortgageAmount || !interestRate || !loanTermYears}
                    >
                        Calculate Mortgage
                    </Button>
                </Box>
            </Paper>
            {results && (
                <Paper sx={{ p: 4, backgroundColor: '#e3f2fd' }}>
                    <Typography variant="h6" gutterBottom>
                        Standard Mortgage Calculation
                    </Typography>
                    <Typography>
                        <strong>Monthly Payment:</strong> ${results.monthlyPayment.toFixed(2)}
                    </Typography>
                    <Typography>
                        <strong>Total Payment:</strong> ${results.totalPayment.toFixed(2)}
                    </Typography>
                    <Typography>
                        <strong>Total Interest:</strong> ${results.totalInterest.toFixed(2)}
                    </Typography>
                    {results.extraPayment > 0 && (
                        <>
                            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                                With Extra Payment
                            </Typography>
                            <Typography>
                                <strong>Effective Payoff Time:</strong> {results.effectiveMonths} months (~
                                {(results.effectiveMonths / 12).toFixed(1)} years)
                            </Typography>
                            <Typography>
                                <strong>Total Interest (with Extra Payment):</strong> $
                                {results.effectiveTotalInterest.toFixed(2)}
                            </Typography>
                        </>
                    )}
                </Paper>
            )}
        </Container>
    );
};

export default MortgagePage;
