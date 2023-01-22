import styles from '../styles/Register.module.css'
import Image from 'next/image';
import { useState } from 'react'
import validator from 'validator'

export default function Register() {

    // username validator
    const [errorUserMsg, setErrorUserMsg] = useState('');
    // email validator
    const [errorEmailMsg, setErrorEmailMsg] = useState('');
    // password validator
    const [errorPassMsg, setErrorPassMsg] = useState('');
    // submit button enable/disable
    const [toggleRegBtn, setToggleRegBtn] = useState(true);
    // dropdown list
    const [value, setValue] = useState('bat');

    const validateUser = (value) => {
        if (!validator.isEmpty(value) && validator.isAlphanumeric(value) && validator.isLength(value, {
            min: 3, max: 16,
          })) {
            setErrorUserMsg('')
        } else {
            setErrorUserMsg('A felhasználónév nem lehet üres, 3-16 karakter közti hosszúságú kell legyen és csak betűket meg számokat tartalmazhat.')
        }
    }

    const validateEmail = (value) => {
        if (validator.isEmail(value, {
            allow_display_name: false, require_display_name: false, allow_utf8_local_part: true, 
            require_tld: true, allow_ip_domain: false, domain_specific_validation: false, 
            blacklisted_chars: '', host_blacklist: []
        })) {
            setErrorEmailMsg('')
        } else {
            setErrorEmailMsg('A megadott email-cím formátuma nem megfelelő.')
        }
    }

    const validatePass = (value) => {
        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        }) && validator.isLength(value, {
            min: 8, max: 16,
        })) {
            setErrorPassMsg('')
            Toggle()
        } else {
            setErrorPassMsg('A jelszó 8-16 karakter közti hosszúságú kell legyen, minimum egy kicsi és egy nagy betűt, egy számot és szimbólumot kell tartalmaznia.')
        }
    }

    function Toggle() {
        setToggleRegBtn(false)
    }

    function FajDisplay() { 
        return ((e) => setValue(e.target.value))
    }

    return (
    <>
        <form id="form">
        <div className={styles.register}>
            <label htmlFor="username">Felhasználónév</label>
            <input type="text" name="username" onChange={(e) => validateUser(e.target.value)} />
            {errorUserMsg === '' ? null : 
                <span style={{
                    fontWeight: 'thin',
                    color: 'red',
                }}>{errorUserMsg}</span>}
            <label htmlFor="email" className={styles.dist}>Email</label>
            <input type="email" name="email" onChange={(e) => validateEmail(e.target.value)}/>
            {errorEmailMsg === '' ? null : 
                <span style={{
                        fontWeight: 'thin', 
                        color: 'red',
                }}>{errorEmailMsg}</span>}
            <label htmlFor="password" className={styles.dist}>Jelszó</label>
            <input type="password" name="password" onChange={(e) => validatePass(e.target.value)}/>
            {errorPassMsg === '' ? null :
                <span style={{
                        fontWeight: 'thin',
                        color: 'red',
                }}>{errorPassMsg}</span>}
            <label htmlFor="faj" className={styles.dist}>Faj</label>
            <select name="faj" onChange={FajDisplay()}>
                    <option value="bat" >Denevérek</option>
                    <option value="dunefolk" >Dűnék-népe</option>
                    <option value="human" >Emberek</option>
                    <option value="undead" >Élőholtak</option>
                    <option value="wose" >Fapásztorok</option>
                    <option value="wolf" >Farkasok</option>
                    <option value="gryphon" >Griffek</option>
                    <option value="saurian" >Gyíkok</option>
                    <option value="goblin" >Koboldok</option>
                    <option value="horse" >Lovak</option>
                    <option value="mechanical" >Mechanikus</option>
                    <option value="naga" >Nagák</option>
                    <option value="ogre" >Ogrék</option>
                    <option value="orc" >Orkok</option>
                    <option value="drake" >Perzsekények</option>
                    <option value="merfolk" >Sellők</option>
                    <option value="falcon" >Sólymok</option>
                    <option value="monster" >Szörnyek</option>
                    <option value="dwarve" >Törpök</option>
                    <option value="troll" >Trollok</option>
                    <option value="elf" >Tündék</option>
            </select>
            
            <div className={styles.fajkep}>
                {/* fajok képeit mutatja kattintásra a listából */}
                <Image 
                    src={`/fajok/${value}.png`}
                    alt={`${value}-icon`}
                    width={72}
                    height={72}
                    priority
                />
            </div>
            
            <div className={styles.button}>
                <button disabled={toggleRegBtn}>Regisztrálok</button>
            </div>
        </div>
        </form>
    </>
    )
}
