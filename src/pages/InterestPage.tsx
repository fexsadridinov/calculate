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

const InterestRatePage = () => {
    const [loanAmount, setLoanAmount] = useState('');
    const [annualInterestRate, setAnnualInterestRate] = useState('');
    const [loanTermMonths, setLoanTermMonths] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
    const [totalPayment, setTotalPayment] = useState<number | null>(null);
    const [totalInterest, setTotalInterest] = useState<number | null>(null);

    const calculateInterest = () => {
        const principal = parseFloat(loanAmount);
        const annualRate = parseFloat(annualInterestRate) / 100;
        const n = parseFloat(loanTermMonths);

        if (isNaN(principal) || isNaN(annualRate) || isNaN(n)) {
            setMonthlyPayment(null);
            setTotalPayment(null);
            setTotalInterest(null);
            return;
        }

        const monthlyRate = annualRate / 12;
        // Calculate the monthly payment using the standard amortization formula
        const payment =
            (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
        setMonthlyPayment(payment);

        const total = payment * n;
        setTotalPayment(total);
        setTotalInterest(total - principal);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 6 }}>
            <Typography variant="h4" gutterBottom>
                💰 Interest Rate Calculator
            </Typography>

            <Paper sx={{ p: 4, mb: 4 }}>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                        e.preventDefault();
                        calculateInterest();
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} component={'div' as any}>
                            <TextField
                                label="Loan Amount ($)"
                                fullWidth
                                value={loanAmount}
                                onChange={(e) => setLoanAmount(e.target.value)}
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} component={'div' as any}>
                            <TextField
                                label="Annual Interest Rate (%)"
                                fullWidth
                                value={annualInterestRate}
                                onChange={(e) => setAnnualInterestRate(e.target.value)}
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} component={'div' as any}>
                            <TextField
                                label="Loan Term (Months)"
                                fullWidth
                                value={loanTermMonths}
                                onChange={(e) => setLoanTermMonths(e.target.value)}
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
                        disabled={!loanAmount || !annualInterestRate || !loanTermMonths}
                    >
                        Calculate
                    </Button>
                </Box>
            </Paper>

            {monthlyPayment !== null &&
                totalPayment !== null &&
                totalInterest !== null && (
                    <Paper sx={{ p: 4, backgroundColor: '#e8f5e9' }}>
                        <Typography variant="h6">📊 Results</Typography>
                        <Typography>
                            <strong>Monthly Payment:</strong> ${monthlyPayment.toFixed(2)}
                        </Typography>
                        <Typography>
                            <strong>Total Payment:</strong> ${totalPayment.toFixed(2)}
                        </Typography>
                        <Typography>
                            <strong>Total Interest:</strong> ${totalInterest.toFixed(2)}
                        </Typography>
                    </Paper>
                )}
        </Container>
    );
};

export default InterestRatePage;
