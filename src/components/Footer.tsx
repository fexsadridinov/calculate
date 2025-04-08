import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                backgroundColor: 'primary.main',
                color: 'white',
                textAlign: 'center',
                py: 1,
            }}
        >
            <Typography variant="body2">
                © {new Date().getFullYear()} C A L C U L A T E D . All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
