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
import * as React from "react";

const APRPage = () => {
    const [loanAmount, setLoanAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [loanTermMonths, setLoanTermMonths] = useState('');
    const [fees, setFees] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
    const [apr, setApr] = useState<number | null>(null);

    const calculateAPR = () => {
        const principal = parseFloat(loanAmount);
        const rate = parseFloat(interestRate) / 100 / 12;
        const n = parseFloat(loanTermMonths);
        const feeAmount = parseFloat(fees);

        if (isNaN(principal) || isNaN(rate) || isNaN(n)) {
            setApr(null);
            setMonthlyPayment(null);
            return;
        }

        const monthly = (principal * rate) / (1 - Math.pow(1 + rate, -n));
        setMonthlyPayment(monthly);

        const netLoan = principal - (feeAmount || 0);

        let guess = rate;
        const tolerance = 1e-6;
        const maxIterations = 100;
        let i = 0;

        while (i < maxIterations) {
            const f = (monthly * (1 - Math.pow(1 + guess, -n))) / guess - netLoan;
            const fPrime =
                (monthly *
                    (n * Math.pow(1 + guess, -n - 1) * guess +
                        Math.pow(1 + guess, -n) -
                        1)) /
                (guess * guess);

            const newGuess = guess - f / fPrime;
            if (Math.abs(newGuess - guess) < tolerance) break;

            guess = newGuess;
            i++;
        }

        const estimatedAPR = guess * 12 * 100;
        setApr(estimatedAPR);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 6 }}>
            <Typography variant="h4" gutterBottom>
                🧮 Ultimate APR Calculator
            </Typography>

            <Paper sx={{ p: 4, mb: 4 }}>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                        e.preventDefault();
                        calculateAPR();
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
                                label="Interest Rate (%)"
                                fullWidth
                                value={interestRate}
                                onChange={(e) => setInterestRate(e.target.value)}
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
                        <Grid item xs={12} sm={6} component={'div' as any}>
                            <TextField
                                label="Fees (Optional)"
                                fullWidth
                                value={fees}
                                onChange={(e) => setFees(e.target.value)}
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
                        disabled={!loanAmount || !interestRate || !loanTermMonths}
                    >
                        Calculate APR
                    </Button>
                </Box>
            </Paper>

            {apr !== null && (
                <Paper sx={{ p: 4, backgroundColor: '#e3f2fd' }}>
                    <Typography variant="h6">📊 Result</Typography>
                    <Typography>
                        <strong>Monthly Payment:</strong> ${monthlyPayment!.toFixed(2)}
                    </Typography>
                    <Typography>
                        <strong>Estimated APR:</strong> {apr.toFixed(3)}%
                    </Typography>
                </Paper>
            )}
        </Container>
    );
};

export default APRPage;
