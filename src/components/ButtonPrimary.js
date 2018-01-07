import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const ButtonPrimary = () => (
    <div>
        <Button primary>Click the button</Button>
        <div style={{margin: '5px'}}>
            <Button animated positive>
                <Button.Content visible>
                    PostIt!
                </Button.Content>
                <Button.Content hidden>
                    <Icon name='plus' />
                </Button.Content>
            </Button>
            <Button animated='vertical'>
                <Button.Content hidden>Shop</Button.Content>
                <Button.Content visible>
                    <Icon name='shop' />
                </Button.Content>
            </Button>
            <Button animated='fade'>
                <Button.Content visible>
                    Sign-up for a Pro account
                </Button.Content>
                <Button.Content hidden>
                    $12.99 a month
                </Button.Content>
            </Button>
        </div>

    </div>

)

export default ButtonPrimary
