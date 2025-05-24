// App.jsx
import { Box, Flex, Grid, Button } from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { ThemeContext } from './ThemeContext';

function App() {
  const { isLoggedIn, toggleAuth } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const getBgColor = (light, dark) => (theme === 'light' ? light : dark);
  const getTextColor = () => (theme === 'light' ? 'black' : 'white');

  return (
    <>
      <Flex
        as="nav"
        p="4"
        bg={getBgColor('gray.100', 'gray.700')}
        color={getTextColor()}
        justifyContent="space-between"
      >
        <Button onClick={toggleAuth}>
          {isLoggedIn ? 'Log Out' : 'Log In'}
        </Button>
        <Button onClick={toggleTheme}>
          Toggle to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </Button>
      </Flex>

      <Grid
        templateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
        gap="4"
        p="4"
      >
        {['Card 1', 'Card 2', 'Card 3'].map((card) => (
          <Box
            key={card}
            p="4"
            shadow="md"
            bg={getBgColor('gray.200', 'gray.600')}
            color={getTextColor()}
            borderRadius="md"
          >
            {card}
          </Box>
        ))}
      </Grid>

      <Box
        as="footer"
        p="4"
        bg={getBgColor('gray.300', 'gray.800')}
        color={getTextColor()}
        textAlign="center"
      >
        Footer Content
      </Box>
    </>
  );
}

export default App;
