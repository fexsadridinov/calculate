import { useState } from "react";
import {
    Container,
    Typography,
    Box,
    ToggleButton,
    ToggleButtonGroup,
    TextField,
    Button,
    Paper,
} from "@mui/material";

type Mode =
    | "of"
    | "isWhatPercent"
    | "addPercent"
    | "subtractPercent"
    | "change";

const modes: { key: Mode; label: string }[] = [
    { key: "of", label: "X % of Y" },
    { key: "isWhatPercent", label: "X is what % of Y" },
    { key: "addPercent", label: "X + Y %" },
    { key: "subtractPercent", label: "X - Y %" },
    { key: "change", label: "Change from X to Y" },
];

const PercentagePage = () => {
    const [mode, setMode] = useState<Mode>("of");
    const [x, setX] = useState("");
    const [y, setY] = useState("");
    const [result, setResult] = useState<number | null>(null);

    const calculate = () => {
        const num1 = parseFloat(x);
        const num2 = parseFloat(y);
        if (isNaN(num1) || isNaN(num2)) {
            setResult(null);
            return;
        }

        let res = 0;
        switch (mode) {
            case "of":
                res = (num1 / 100) * num2;
                break;
            case "isWhatPercent":
                res = (num1 / num2) * 100;
                break;
            case "addPercent":
                res = num1 + (num1 * num2) / 100;
                break;
            case "subtractPercent":
                res = num1 - (num1 * num2) / 100;
                break;
            case "change":
                res = ((num2 - num1) / num1) * 100;
                break;
        }
        setResult(res);
    };

    const renderInputs = () => {
        switch (mode) {
            case "of":
                return (
                    <Typography variant="h6" align="center">
                        What is {" "}
                        <TextField
                            variant="outlined"
                            size="small"
                            value={x}
                            onChange={(e) => setX(e.target.value)}
                            placeholder="X"
                            type="number"
                            sx={{ mx: 1, width: 100 }}
                        />
                        % of {" "}
                        <TextField
                            variant="outlined"
                            size="small"
                            value={y}
                            onChange={(e) => setY(e.target.value)}
                            placeholder="Y"
                            type="number"
                            sx={{ mx: 1, width: 100 }}
                        />
                        ?
                    </Typography>
                );
            case "isWhatPercent":
                return (
                    <Typography variant="h6" align="center">
                        <TextField
                            variant="outlined"
                            size="small"
                            value={x}
                            onChange={(e) => setX(e.target.value)}
                            placeholder="X"
                            type="number"
                            sx={{ mx: 1, width: 100 }}
                        />
                        is what % of {" "}
                        <TextField
                            variant="outlined"
                            size="small"
                            value={y}
                            onChange={(e) => setY(e.target.value)}
                            placeholder="Y"
                            type="number"
                            sx={{ mx: 1, width: 100 }}
                        />
                        ?
                    </Typography>
                );
            case "addPercent":
                return (
                    <Typography variant="h6" align="center">
                        What is {" "}
                        <TextField
                            variant="outlined"
                            size="small"
                            value={x}
                            onChange={(e) => setX(e.target.value)}
                            placeholder="X"
                            type="number"
                            sx={{ mx: 1, width: 100 }}
                        />
                        plus {" "}
                        <TextField
                            variant="outlined"
                            size="small"
                            value={y}
                            onChange={(e) => setY(e.target.value)}
                            placeholder="Y%"
                            type="number"
                            sx={{ mx: 1, width: 100 }}
                        />
                        ?
                    </Typography>
                );
            case "subtractPercent":
                return (
                    <Typography variant="h6" align="center">
                        What is {" "}
                        <TextField
                            variant="outlined"
                            size="small"
                            value={x}
                            onChange={(e) => setX(e.target.value)}
                            placeholder="X"
                            type="number"
                            sx={{ mx: 1, width: 100 }}
                        />
                        minus {" "}
                        <TextField
                            variant="outlined"
                            size="small"
                            value={y}
                            onChange={(e) => setY(e.target.value)}
                            placeholder="Y%"
                            type="number"
                            sx={{ mx: 1, width: 100 }}
                        />
                        ?
                    </Typography>
                );
            case "change":
                return (
                    <Typography variant="h6" align="center">
                        What is the percentage change from{" "}
                        <TextField
                            variant="outlined"
                            size="small"
                            value={x}
                            onChange={(e) => setX(e.target.value)}
                            placeholder="X"
                            type="number"
                            sx={{ mx: 1, width: 100 }}
                        />
                        to{" "}
                        <TextField
                            variant="outlined"
                            size="small"
                            value={y}
                            onChange={(e) => setY(e.target.value)}
                            placeholder="Y"
                            type="number"
                            sx={{ mx: 1, width: 100 }}
                        />
                        ?
                    </Typography>
                );
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 6 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Percentage Calculator
                </Typography>

                <ToggleButtonGroup
                    value={mode}
                    exclusive
                    onChange={(_e, newMode) => {
                        if (newMode !== null) {
                            setMode(newMode);
                            setX("");
                            setY("");
                            setResult(null);
                        }
                    }}
                    fullWidth
                    sx={{mb: 4,
                        flexWrap: "wrap",
                        gap: 1,
                }}
                >
                    {modes.map((m) => (
                        <ToggleButton
                            key={m.key}
                            value={m.key}
                            sx={(theme) => ({
                                my: 2,
                                display: 'block',
                                border: 'none',
                                // If light mode, use existing style:
                                ...(theme.palette.mode === 'light'
                                    ? {
                                        backgroundColor: 'whitesmoke',
                                        color: 'black',
                                        '&.Mui-selected': {
                                            backgroundColor: '#c8c8c8',
                                            color: 'black',
                                        },
                                    }
                                    : {
                                        // Dark mode style: unselected => grey and white text
                                        backgroundColor: 'grey',
                                        color: 'white',
                                        // When selected, reverse the colors:
                                        '&.Mui-selected': {
                                            backgroundColor: 'white',
                                            color: 'grey',
                                        },
                                    }),
                                // To ensure no left borders are applied:
                                borderLeft: 'none',
                                '&:first-of-type': {
                                    borderLeft: 'none',
                                },
                            })}
                        >
                            {m.label}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>

                <Box>{renderInputs()}</Box>

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 4 }}
                    onClick={calculate}
                >
                    Calculate
                </Button>

                {result !== null && (
                    <Box
                        sx={{
                            mt: 3,
                            p: 2,
                            backgroundColor: "#969696",
                            border: "1px solid #81c784",
                            borderRadius: "4px",
                            textAlign: "center",
                        }}
                    >
                        <Typography variant="h6">
                            Result:{" "}
                            <strong>
                                {result.toFixed(2)}
                                {(mode === "isWhatPercent" || mode === "change") ? "%" : ""}
                            </strong>
                        </Typography>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default PercentagePage;
