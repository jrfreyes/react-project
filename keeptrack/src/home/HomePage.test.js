import HomePage from "./HomePage"
import renderer from 'react-test-renderer';

describe('<HomePage />', () => {
    test('snapshot', () => {
        const tree = renderer.create(<HomePage />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})

