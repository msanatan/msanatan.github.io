---
title: Contact
date: 2017-11-01 17:17:49
---

Questions or feedback on my writings and/or interests? I'm always happy to get
in contact.

<form action="https://formspree.io/msanatan@gmail.com"
    method="POST"
    id="contact">
    <fieldset class="field">
        <label for="name">Name (required)</label>
        <input type="text" name="name" class="contact-text-input" required />
    </fieldset>
    <fieldset class="field">
        <label for="_replyto">Email (required)</label>
        <input type="email" name="_replyto" class="contact-text-input" required />
    </fieldset>
    <fieldset class="field">
        <label for="message">Message</label>
        <textarea name="message" cols="50" rows="10" class="contact-textarea" required></textarea>
    </fieldset>
    <fieldset class="field field-button">
        <input type="text" name="_gotcha" style="display:none" />
        <input type="hidden" name="_subject" value="Message via http://msanatan.com" />
        <input type="hidden" name="_next" value="/" />
        <input type="submit" class="contact-button" value="Send" />
    </fieldset>
</form>
